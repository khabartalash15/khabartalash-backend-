import express from "express";
import {
  createInterview,
  deleteSingleInterview,
  getPaginatedInterviews,
  getSingleInterview,
  updateSingleInterview,
} from "../controllers/InterviewController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", createInterview);
router.get("/", getPaginatedInterviews);
router.get("/:id", getSingleInterview);
router.put("/:id", updateSingleInterview);
router.delete("/:id", deleteSingleInterview);

export default router;
