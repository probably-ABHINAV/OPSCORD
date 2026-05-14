'use server';

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const githubToken = process.env.GITHUB_TOKEN;

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not defined in the environment.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');
// Using the absolute most stable alias to bypass specific model naming issues
const MODEL_NAME = 'gemini-flash-latest';

export type AnalysisResult = {
  success: boolean;
  error?: string;
  data?: {
    wrongCodeSnippet: string;
    suggestedFixDiff: string;
    riskScore: number;
    timeline: string;
    steps: string[];
    explanation: string;
    complexityScore: number;
    impactRadius: string[];
    fileName: string;
    fixedFileContent: string;
    securityReport: string;
    performanceReport: string;
    architectureReport: string;
    suggestedTestCode?: string;
    suggestedTestFileName?: string;
  };
  repoContext?: { owner: string; repo: string; branch: string };
};

export async function analyzeCode(githubUrl: string): Promise<AnalysisResult> {
  if (!apiKey) {
    return { success: false, error: 'GEMINI_API_KEY is missing.' };
  }

  const headers: Record<string, string> = {};
  if (githubToken) {
    headers['Authorization'] = `Bearer ${githubToken}`;
  }

  try {
    let codeData = '';
    let commitHistoryContext = '';
    let packageJsonContext = '';
    let repoContextData: { owner: string; repo: string; branch: string } | undefined;

    if (githubUrl.includes('github.com') && githubUrl.includes('/blob/')) {
      const rawUrl = githubUrl
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/');
      const res = await fetch(rawUrl, { headers });
      if (!res.ok) throw new Error(`Failed to fetch file from GitHub: ${res.statusText}`);
      codeData = await res.text();
    } else if (
      githubUrl.includes('github.com') &&
      !githubUrl.includes('raw.githubusercontent.com')
    ) {
      // Treat as a Repository URL
      const cleanUrl = githubUrl.trim().replace(/\.git$/, '');
      const match = cleanUrl.match(/github\.com\/([^/]+)\/([^/]+)/);

      if (match) {
        const owner = match[1];
        const repo = match[2];

        // 1. Fetch repo details for default branch
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
        if (!repoRes.ok)
          throw new Error("Failed to fetch repository details. Make sure it's public.");
        const repoJson = await repoRes.json();
        const defaultBranch = repoJson.default_branch || 'main';

        repoContextData = { owner, repo, branch: defaultBranch };

        // 1.5 Fetch commit history for context
        const historyRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits?per_page=3`,
          { headers }
        );
        if (historyRes.ok) {
          const historyJson = await historyRes.json();
          commitHistoryContext = historyJson
            .map(
              (c: { commit: { message: string; author: { date: string } } }) =>
                `- ${c.commit.message} (${c.commit.author.date})`
            )
            .join('\n');
        }

        // 2. Fetch repo tree
        const treeRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
          { headers }
        );
        if (!treeRes.ok) throw new Error('Failed to fetch repository files.');
        const treeJson = await treeRes.json();

        // 2.5 Grab package.json if it exists
        const packageJsonFile = treeJson.tree?.find(
          (f: { path: string }) => f.path === 'package.json'
        );
        if (packageJsonFile) {
          const pkgRes = await fetch(
            `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/package.json`,
            { headers }
          );
          if (pkgRes.ok) packageJsonContext = await pkgRes.text();
        }

        // 3. Filter interesting files (get top 5 code files to keep prompt sizes manageable)
        const codeFiles = (treeJson.tree || [])
          .filter(
            (f: { type: string; path: string }) =>
              f.type === 'blob' &&
              /\.(js|ts|jsx|tsx|py|go|java|c|cpp|cs|php|html|css)$/i.test(f.path)
          )
          .slice(0, 5);

        if (codeFiles.length === 0) {
          throw new Error('No readable code files found in the repository.');
        }

        // 4. Fetch the content of those files
        let combinedCode = '';
        for (const file of codeFiles) {
          const fileRawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${file.path}`;
          const fileRes = await fetch(fileRawUrl, { headers });
          if (fileRes.ok) {
            const text = await fileRes.text();
            combinedCode += `\n\n--- File: ${file.path} ---\n${text}`;
          }
        }
        codeData = combinedCode;
      } else {
        throw new Error('Invalid GitHub URL format.');
      }
    } else {
      // Standard raw URL
      const res = await fetch(githubUrl, { headers });
      if (!res.ok) throw new Error(`Failed to fetch URL: ${res.statusText}`);
      codeData = await res.text();
    }

    if (!codeData || codeData.trim() === '') {
      return { success: false, error: 'The fetched file is empty.' };
    }

    // 3. Call Gemini
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            wrongCodeSnippet: {
              type: SchemaType.STRING,
              description:
                'The exact snippet of code from the file that contains a bug, bad practice, or vulnerability. Can be multi-line.',
            },
            suggestedFixDiff: {
              type: SchemaType.STRING,
              description:
                'A unified diff format string showing the exact code changes needed to fix the issue. Use - for removed lines and + for added lines.',
            },
            riskScore: {
              type: SchemaType.INTEGER,
              description:
                'A causality risk score from 0 to 100 indicating the severity of the issue.',
            },
            timeline: {
              type: SchemaType.STRING,
              description:
                "An estimated timeline string for resolving the issue (e.g., '2 hours', '1 day').",
            },
            steps: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description:
                'A list of concrete steps the developer should take to resolve the issue.',
            },
            explanation: {
              type: SchemaType.STRING,
              description: 'A short explanation of WHY the code is wrong.',
            },
            complexityScore: {
              type: SchemaType.INTEGER,
              description:
                'A score from 1-100 indicating the cyclomatic and cognitive complexity of the affected code.',
            },
            impactRadius: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description:
                'A list of other files or components that might break if this issue is fixed.',
            },
            fileName: {
              type: SchemaType.STRING,
              description:
                'The exact relative path of the file containing the bug (e.g. app/page.tsx). It must be one of the files provided in the prompt.',
            },
            fixedFileContent: {
              type: SchemaType.STRING,
              description:
                "The COMPLETE content of the file specified in 'fileName' with the issue resolved. Must include all original unaffected code.",
            },
            securityReport: {
              type: SchemaType.STRING,
              description:
                'A short report from the perspective of a Senior Security Auditor identifying any exploit vectors.',
            },
            performanceReport: {
              type: SchemaType.STRING,
              description:
                'A short report from a Performance Engineer focusing on Big-O efficiency and memory leaks.',
            },
            architectureReport: {
              type: SchemaType.STRING,
              description:
                'A short report from an Architecture Lead focusing on DRY principles, typing, and component design.',
            },
            suggestedTestCode: {
              type: SchemaType.STRING,
              description:
                'A complete suite of Unit Tests (e.g. Jest, Vitest, or pytest) that verifies the bug is fixed and handles edge cases.',
            },
            suggestedTestFileName: {
              type: SchemaType.STRING,
              description:
                "The appropriate filename for the unit test (e.g., 'app/page.test.tsx' or 'utils_test.py').",
            },
          },
          required: [
            'wrongCodeSnippet',
            'suggestedFixDiff',
            'riskScore',
            'timeline',
            'steps',
            'explanation',
            'complexityScore',
            'impactRadius',
            'fileName',
            'fixedFileContent',
            'securityReport',
            'performanceReport',
            'architectureReport',
          ],
        },
      },
    });

    const prompt = `
      You are the OpsCord Multi-Agent Swarm (Security, Performance, and Architecture).
      Analyze the following source code collaboratively.

      Provide your findings exactly matching the JSON schema.
      1. Ensure 'suggestedFixDiff' and 'fixedFileContent' fix the most critical unified issue.
      2. Provide a 'suggestedTestCode' file to verify the fix works.
      3. Supply individual brief reports from your respective persona viewpoints.
      
      Recent Commit History (for context on regressions):
      ${commitHistoryContext || 'No history available'}
      
      Package/Dependencies Context:
      ${packageJsonContext || 'No dependency context available'}

      Code to analyze:
      \`\`\`
      ${codeData}
      \`\`\`
      
      Provide your findings exactly matching the JSON schema requested.
      Ensure 'suggestedFixDiff' offers a complete, syntactically correct change for the 'fileName' you specify.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the structured JSON output
    const data = JSON.parse(responseText);

    return { success: true, data, repoContext: repoContextData };
  } catch (error: unknown) {
    console.error('Error analyzing code:', error);
    return { success: false, error: (error as Error).message || 'An unexpected error occurred.' };
  }
}
