import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body as { model?: string; messages?: ChatMessage[] };

      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({ error: "Missing GEMINI_API_KEY" });
        return;
      }

      if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: "Missing messages" });
        return;
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
        res.status(502).json({
          error: "Gemini request failed",
          details: data,
        });
        return;
      }

      const text =
        data?.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part?.text ?? "")
          .join("") ?? "";

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
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
        res.status(500).json({ error: "Chat request failed" });
      } else {
        res.end();
      }
    }
  });

  return httpServer;
}
