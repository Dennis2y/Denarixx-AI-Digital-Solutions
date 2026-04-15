import type { VercelRequest, VercelResponse } from "@vercel/node";

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function messagesToPrompt(messages: ChatMessage[]): string {
  return messages
    .map((m) => {
      const role =
        m.role === "system"
          ? "System"
          : m.role === "assistant"
            ? "Assistant"
            : "User";
      return `${role}: ${m.content}`;
    })
    .join("\n\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as { model?: string; messages?: ChatMessage[] };

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing messages" });
    }

    const prompt = messagesToPrompt(messages);

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(502).json({
        error: "Gemini request failed",
        details: data,
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part?.text ?? "")
        .join("")
        .trim() || "Sorry, I could not generate a reply.";

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    res.write(
      `data: ${JSON.stringify({
        id: "denarixx-gemini",
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: GEMINI_MODEL,
        choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
      })}\n\n`
    );

    res.write(
      `data: ${JSON.stringify({
        id: "denarixx-gemini",
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: GEMINI_MODEL,
        choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
      })}\n\n`
    );

    res.write(
      `data: ${JSON.stringify({
        id: "denarixx-gemini",
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: GEMINI_MODEL,
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })}\n\n`
    );

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Chat route error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Chat request failed" });
    }
    res.end();
  }
}
