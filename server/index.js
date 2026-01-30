import "dotenv/config";
import express from "express";
import cors from "cors";
import quizRoutes from "./routes/QuizRoutes.js";
import notesRoutes from "./routes/notesroutes.js";
import revisionRoutes from "./routes/revisionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/notes", notesRoutes);
app.use("/api/quiz",quizRoutes);
app.use("/api/revisions", revisionRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* GLOBAL ERROR HANDLER (VERY IMPORTANT) */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.message);
  res.status(400).json({ error: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
