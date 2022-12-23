import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/** READ */
router.get("/", verifyToken, getFeedPosts); //will grab user feed when we are on home page
router.get("/:userId/posts", verifyToken, getUserPosts); //grab only the relevant users post

/** UPDATE  */
router.patch("/:id/like", verifyToken, likePost); //for liking and unliking a post

export default router;