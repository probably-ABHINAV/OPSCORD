'use server';

const apiKey = process.env.GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.5-flash';

export type ChatMessage = {
  role: 'user' | 'model';
  content: string;
};

export type ChatResult = {
  success: boolean;
  error?: string;
  response?: string;
};

export async function chatCode(
  message: string,
  history: ChatMessage[],
  contextCode: string
): Promise<ChatResult> {
  if (!apiKey) {
    return { success: false, error: 'GEMINI_API_KEY is missing.' };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `You are an expert pair-programmer. I am looking at the following code which supposedly has some issues: \n\n\`\`\`\n${contextCode}\n\`\`\`\n\nI will ask you questions about it.`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          { text: 'Understood. I have the code context. How can I help you debug or explain it?' },
        ],
      },
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
      // Keep-alive or timeout settings can be added here if needed
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Google API returned ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    return { success: true, response: responseText };
  } catch (error: unknown) {
    console.error('Error in chatCode REST:', error);
    return { success: false, error: (error as Error).message || 'Chat failed' };
  }
}
