"use server";

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const githubToken = process.env.GITHUB_TOKEN;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined in the environment.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");
// Using the absolute most stable alias to bypass specific model naming issues
const MODEL_NAME = "gemini-flash-latest"; 

export type AnalysisResult = {
  success: boolean;
  error?: string;
  data?: {
    wrongCodeSnippet: string;
    riskScore: number;
    timeline: string;
    steps: string[];
    explanation: string;
  };
};

export async function analyzeCode(githubUrl: string): Promise<AnalysisResult> {
  if (!apiKey) {
    return { success: false, error: "GEMINI_API_KEY is missing." };
  }

  const headers: Record<string, string> = {};
  if (githubToken) {
    headers["Authorization"] = `Bearer ${githubToken}`;
  }

  try {
    let codeData = "";

    if (githubUrl.includes("github.com") && githubUrl.includes("/blob/")) {
      const rawUrl = githubUrl
        .replace("github.com", "raw.githubusercontent.com")
        .replace("/blob/", "/");
      const res = await fetch(rawUrl, { headers });
      if (!res.ok) throw new Error(`Failed to fetch file from GitHub: ${res.statusText}`);
      codeData = await res.text();
    } else if (githubUrl.includes("github.com") && !githubUrl.includes("raw.githubusercontent.com")) {
      // Treat as a Repository URL
      const cleanUrl = githubUrl.trim().replace(/\.git$/, "");
      const match = cleanUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      
      if (match) {
        const owner = match[1];
        const repo = match[2];

        // 1. Fetch repo details for default branch
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
        if (!repoRes.ok) throw new Error("Failed to fetch repository details. Make sure it's public.");
        const repoJson = await repoRes.json();
        const defaultBranch = repoJson.default_branch || "main";

        // 2. Fetch repo tree
        const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`, { headers });
        if (!treeRes.ok) throw new Error("Failed to fetch repository files.");
        const treeJson = await treeRes.json();

        // 3. Filter interesting files (get top 5 code files to keep prompt sizes manageable)
        const codeFiles = (treeJson.tree || [])
          .filter((f: any) => f.type === "blob" && /\.(js|ts|jsx|tsx|py|go|java|c|cpp|cs|php|html|css)$/i.test(f.path))
          .slice(0, 5);

        if (codeFiles.length === 0) {
          throw new Error("No readable code files found in the repository.");
        }

        // 4. Fetch the content of those files
        let combinedCode = "";
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
        throw new Error("Invalid GitHub URL format.");
      }
    } else {
      // Standard raw URL
      const res = await fetch(githubUrl, { headers });
      if (!res.ok) throw new Error(`Failed to fetch URL: ${res.statusText}`);
      codeData = await res.text();
    }

    if (!codeData || codeData.trim() === "") {
        return { success: false, error: "The fetched file is empty." };
    }

    // 3. Call Gemini
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            wrongCodeSnippet: {
              type: SchemaType.STRING,
              description: "The exact snippet of code from the file that contains a bug, bad practice, or vulnerability. Can be multi-line.",
            },
            riskScore: {
              type: SchemaType.INTEGER,
              description: "A causality risk score from 0 to 100 indicating the severity of the issue.",
            },
            timeline: {
              type: SchemaType.STRING,
              description: "An estimated timeline string for resolving the issue (e.g., '2 hours', '1 day').",
            },
            steps: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "A list of concrete steps the developer should take to resolve the issue.",
            },
            explanation: {
                type: SchemaType.STRING,
                description: "A short explanation of WHY the code is wrong.",
            }
          },
          required: ["wrongCodeSnippet", "riskScore", "timeline", "steps", "explanation"],
        },
      },
    });

    const prompt = `
      You are an expert DevOps and Security Code Analyzer for the OpsCord platform.
      Analyze the following source code and find the most critical bug, security vulnerability, or bad practice.
      
      Code to analyze:
      \`\`\`
      ${codeData}
      \`\`\`
      
      Provide your findings exactly matching the JSON schema requested. If the code is perfect, find the weakest point or a theoretical improvement and give it a low risk score.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse the structured JSON output
    const data = JSON.parse(responseText);

    return { success: true, data };
  } catch (error: any) {
    console.error("Error analyzing code:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
