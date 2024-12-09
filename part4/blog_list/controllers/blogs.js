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
  const blog = new Blog(request.body);
  try {
    const postedBlog = await blog.save();
    response.status(201).json(postedBlog);
  } catch (err) {
    logger.error("Error saving blog:", err.message);
    response.status(500).json({ error: "Failed to save blog" });
  }
});

module.exports = blogsRouter;
