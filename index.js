import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import postRoutes from "./routes/post.js";

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/posts", postRoutes);

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(
    `[${new Date().toLocaleTimeString()}] Server is running on port ${PORT}`,
  );
});
