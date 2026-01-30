import { query } from "../db/index.js";

export const getRevisions = async (req, res) => {
  try {
    const todayResult = await query(`
      SELECT 
        t.title AS topic_title,
        r.next_revision,
        q.score,
        q.total
      FROM revisions r
      JOIN topics t ON r.topic_id = t.id
      JOIN quiz_attempts q ON q.topic_id = t.id
      WHERE r.next_revision <= CURRENT_DATE
      ORDER BY r.next_revision ASC
    `);

    const upcomingResult = await query(`
      SELECT 
        t.title AS topic_title,
        r.next_revision,
        q.score,
        q.total
      FROM revisions r
      JOIN topics t ON r.topic_id = t.id
      JOIN quiz_attempts q ON q.topic_id = t.id
      WHERE r.next_revision > CURRENT_DATE
      ORDER BY r.next_revision ASC
    `);

    res.json({
      today: todayResult.rows,
      upcoming: upcomingResult.rows,
    });
  } catch (err) {
    console.error("REVISION FETCH ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch revisions" });
  }
};
