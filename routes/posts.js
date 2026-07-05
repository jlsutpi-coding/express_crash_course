import express from "express";

const router = express.Router();

let posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
];

router.get("/", (req, res) => {
  res.status(200).json({ posts });
});

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

export default router;
