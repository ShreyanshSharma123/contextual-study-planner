import express from "express"
import multer from "multer";
import { uploadNotes } from "../controllers/notesController.js"

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1500 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"));
    } else {
      cb(null, true);
    }
  }
});

router.post("/upload", upload.single("file"), uploadNotes);

export default router;


