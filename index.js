import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import postRoutes from "./routes/posts.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/error.js";
import notFound from "./middlewares/notFound.js";

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/posts", postRoutes);

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(notFound);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `[${new Date().toLocaleTimeString()}] Server is running on port ${PORT}`,
  );
});
