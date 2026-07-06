import express from "express";
import {
  getPostById,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

// GET route to get all posts
router.get("/", getPosts);

// GET route to get a single post by ID
router.get("/:id", getPostById);

// Post route to create a new post
router.post("/", createPost);

// PUT route to update a post by ID
router.put("/:id", updatePost);

// DELETE route to delete a post by ID
router.delete("/:id", deletePost);

export default router;
