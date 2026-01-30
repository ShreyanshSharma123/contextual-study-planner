import { query } from "../db/index.js";

export const getStats = async (req, res) => {
  const uploads = await query("SELECT COUNT(*) FROM uploads");
  const topics = await query("SELECT COUNT(*) FROM topics");
  const revisions = await query(
    "SELECT COUNT(*) FROM revisions WHERE next_revision <= CURRENT_DATE",
  );

  res.json({
    notesUploaded: Number(uploads.rows[0].count),
    topicsIdentified: Number(topics.rows[0].count),
    pendingRevisions: Number(revisions.rows[0].count),
  });
};
