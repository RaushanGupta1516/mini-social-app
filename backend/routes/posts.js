import express from "express";
import {
  createPost,
  getFeed,
  likePost,
  commentOnPost,
  getComments,
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../config/cloudinary.js";

const router = express.Router();

// feed — public
router.get("/", getFeed);

// create post — protected + image upload handled by multer
router.post("/", protect, upload.single("image"), createPost);

// like a post — protected
router.post("/:id/like", protect, likePost);

// comment on a post — protected
router.post("/:id/comment", protect, commentOnPost);

// get comments — public
router.get("/:id/comments", getComments);

export default router;