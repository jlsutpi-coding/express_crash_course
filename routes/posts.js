import express from "express";

const router = express.Router();

let posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
];

router.get("/", (req, res) => {
  res.status(200).json({ posts });
});

router.get("/:id", (req, res, next) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ post });
});

// Post route to create a new post
router.post("/", (req, res, next) => {
  console.log(req.body);
  if (!req.body.title || !req.body.content) {
    const error = new Error("Title and content are required");
    error.status = 400;
    return next(error);
  }

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  console.log(newPost);

  posts.push(newPost);
  res.status(201).json({ message: "Post created successfully", posts });
});

// PUT route to update a post by ID
router.put("/:id", (req, res, next) => {
  const postId = parseInt(req.params.id);

  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  post.content = req.body.content;
  res.status(200).json({ message: "Post updated successfully", post });
});

// DELETE route to delete a post by ID
router.delete("/:id", (req, res, next) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((p) => p.id !== postId);
  res.status(200).json({ message: "Post deleted successfully", posts });
});

export default router;
