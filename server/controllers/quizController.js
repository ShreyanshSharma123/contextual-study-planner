import { query } from "../db/index.js";
import { calculateNextRevision } from "../utils/revision.js";
import { generateAIQuiz } from "../services/aiQuiz.js";

/**
 * 1️⃣ Generate quiz questions (AI)
 * Used by: POST /api/quiz/generate
 */
export const generateQuiz = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "No content provided" });
  }

  try {
    const questions = await generateAIQuiz(content);
    res.json({ questions });
  } catch (err) {
    console.error("QUIZ GENERATION ERROR:", err.message);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};

/**
 * 2️⃣ Submit quiz result + create revision
 * Used by: POST /api/quiz/submit
 */
export const submitQuiz = async (req, res) => {
  const { topicId, score, total } = req.body;

  if (!topicId || score == null || total == null) {
    return res.status(400).json({ error: "Invalid quiz submission" });
  }

  try {
    // Save quiz attempt
    await query(
      "INSERT INTO quiz_attempts(topic_id, score, total) VALUES($1,$2,$3)",
      [topicId, score, total]
    );

    // Calculate & save next revision
    const nextRevision = calculateNextRevision(score, total);

    await query(
      "INSERT INTO revisions(topic_id, next_revision) VALUES($1,$2)",
      [topicId, nextRevision]
    );

    res.json({ success: true, nextRevision });
  } catch (err) {
    console.error("QUIZ SUBMIT ERROR:", err.message);
    res.status(500).json({ error: "Quiz submission failed" });
  }
};
