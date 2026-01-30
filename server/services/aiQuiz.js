import { geminiModel } from "./geminiClient.js";
import { cleanJson } from "../utils/cleanJson.js";

export async function generateAIQuiz(content) {
  const prompt = `
Generate 5 MCQs from the content below.

Rules:
- 4 options
- answer index (0-based)
- explanation
- Return ONLY valid JSON

Format:
[
  {
    "question": "...",
    "options": ["", "", "", ""],
    "answer": 0,
    "explanation": "..."
  }
]

Content:
${content.slice(0, 6000)}
`;

  const result = await geminiModel.generateContent(prompt);
  const raw = result.response.text();
  console.log("quiz is:",raw);

  const cleaned = cleanJson(raw);

  return JSON.parse(cleaned);
}
