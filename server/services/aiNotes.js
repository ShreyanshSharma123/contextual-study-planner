import { geminiModel } from "./geminiClient.js";
import { cleanJson } from "../utils/cleanJson.js";

export async function generateAINotes(rawText) {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("generateAINotes received invalid text");
  }

  const prompt = `
You are a study assistant.

Convert the following lecture text into structured study notes.

Rules:
- Return 4 to 6 topics
- Each topic must have a title and explanation
- Output ONLY valid JSON
- Format:
[
  { "title": "...", "content": "..." }
]

Lecture text:
${rawText.slice(0, 12000)}
`;

  const result = await geminiModel.generateContent(prompt);
  const raw = result.response.text();
  const cleaned = cleanJson(raw);

  return JSON.parse(cleaned);
}
