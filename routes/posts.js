import express from "express";

const router = express.Router();

let posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
];

router.get("/", (req, res) => {
  res.status(200).json({ posts });
});

// Post route to create a new post
router.post("/", (req, res) => {
  console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  console.log(newPost);
  if (!newPost.title || !newPost.content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  posts.push(newPost);
  res.status(201).json({ message: "Post created successfully", posts });
});

// PUT route to update a post by ID
router.put("/:id", (req, res) => {
  const postId = parseInt(req.params.id);

  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  res.status(200).json({ message: "Post updated successfully", post });
});

// DELETE route to delete a post by ID
router.delete("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  posts = posts.filter((p) => p.id !== postId);
  res.status(200).json({ message: "Post deleted successfully", posts });
});

export default router;
