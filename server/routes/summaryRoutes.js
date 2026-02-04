import express from "express";
import { generateSummary } from "../controllers/summaryController.js";

const router = express.Router();
router.get("/", generateSummary);
export default router;
