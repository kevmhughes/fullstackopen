const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.status(200).json(blogs);
  } catch (err) {
    logger.error("Error fetching blogs:", err.message);
    response.status(500).json({ error: "Failed to fetch blogs" });
  }
});

blogsRouter.post("/", async (request, response) => {
  const { title, url, author, likes } = request.body;

  // Check for missing required fields and provide specific error messages
  if (!title) {
    return response.status(400).json({ error: "Title is required" });
  }
  if (!url) {
    return response.status(400).json({ error: "URL is required" });
  }
  if (!author) {
    return response.status(400).json({ error: "Author is required" });
  }

  const blog = new Blog({
    title,
    url,
    author,
    likes: likes || 0, // Default likes to 0 if not provided
  });

  try {
    const postedBlog = await blog.save();
    response.status(201).json(postedBlog);
  } catch (err) {
    logger.error("Error saving blog:", err.message);
    response.status(500).json({ error: "Failed to save blog" });
  }
});

module.exports = blogsRouter;
