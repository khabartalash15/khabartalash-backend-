import express from "express";
import {
  createNews,
  getSingleNews,
  updateSingleNews,
  getPaginatedNews,
  deleteSingleNews,
} from "../controllers/newsController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", createNews);
router.get("/", getPaginatedNews);
router.get("/:id", getSingleNews);
router.put("/:id", updateSingleNews);
router.delete("/:id", deleteSingleNews);
export default router;
