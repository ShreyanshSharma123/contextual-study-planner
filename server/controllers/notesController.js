import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { generateAINotes } from "../services/aiNotes.js";
import { query } from "../db/index.js";

export const uploadNotes = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        error: "No readable text found in PDF"
      });
    }

    const notes = await generateAINotes(extractedText);

    // DB logic stays SAME
    const uploadRes = await query(
      "INSERT INTO uploads DEFAULT VALUES RETURNING id"
    );
    const uploadId = uploadRes.rows[0].id;

    const savedTopics = [];
    for (const note of notes) {
      const t = await query(
        `INSERT INTO topics(upload_id, title, content, confidence)
         VALUES($1,$2,$3,$4)
         RETURNING id, title, content, confidence`,
        [uploadId, note.title, note.content, note.confidence || "high"]
      );
      savedTopics.push(t.rows[0]);
    }

    res.json({ topics: savedTopics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
