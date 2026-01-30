import express from "express";
import { getRevisions } from "../controllers/revisionController.js";

const router = express.Router();

router.get("/", getRevisions);

export default router;
