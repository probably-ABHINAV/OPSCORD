import { NextResponse } from 'next/server';
import { analyzeCode } from '@/app/actions/analyzeCode';

const githubToken = process.env.GITHUB_TOKEN;

export async function POST(req: Request) {
  try {
    const event = req.headers.get('x-github-event');
    if (event !== 'pull_request') {
      return NextResponse.json({ message: 'Ignored event type.' });
    }

    const payload = await req.json();

    if (payload.action !== 'opened' && payload.action !== 'synchronize') {
      return NextResponse.json({ message: 'Ignored PR action.' });
    }

    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const prNumber = payload.pull_request.number;

    // We pass the base repository URL to our analyzer
    const repoUrl = payload.repository.html_url;

    // Use our Multi-Agent Analyzer to scan the repository
    const result = await analyzeCode(repoUrl);

    if (result.success && result.data && githubToken) {
      // 1. Construct the Executive Report comment
      const commentBody = `
## 🤖 OpsCord Multi-Agent Analysis
*Automatic review triggered by new code.*

### Causality Risk Score: ${result.data.riskScore}/100 🚨
**Complexity Score:** ${result.data.complexityScore}/100

---

#### 🛡 Security Auditor
> ${result.data.securityReport}

#### ⚡ Performance Engineer
> ${result.data.performanceReport}

#### 🏗 Architecture Lead
> ${result.data.architectureReport}

---

**Impact Radius:** \`${result.data.impactRadius.join('`, `')}\`
**Resolution Timeline:** ~${result.data.timeline}

      `;

      // 2. Post the comment to the GitHub PR
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: commentBody }),
        }
      );

      if (!res.ok) {
        console.error('Failed to post comment to GitHub', await res.text());
      }
    }

    return NextResponse.json({ success: true, message: 'Analyzed and commented!' });
  } catch (error: unknown) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
