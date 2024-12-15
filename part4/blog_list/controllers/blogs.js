const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user')
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1});
    console.log("blogs", blogs)
    response.status(200).json(blogs);
  } catch (err) {
    logger.error("Error fetching blogs:", err.message);
    response.status(500).json({ error: "Failed to fetch blogs" });
  }
});

blogsRouter.post("/", async (request, response) => {
  const { title, url, author, likes, userId } = request.body;

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

  const user = await User.findById(userId)

  console.log("user", user)

  const blog = new Blog({
    title,
    url,
    author,
    likes: likes || 0, // Default likes to 0 if not provided
    user: user.id
  });

  try {
    const postedBlog = await blog.save();
    user.blogs = user.blogs.concat(postedBlog._id)
    await user.save()
    response.status(201).json(postedBlog);
  } catch (err) {
    logger.error("Error saving blog:", err.message);
    response.status(500).json({ error: "Failed to save blog" });
  }
});

blogsRouter.get("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    logger.error("Error fetching blog:", err.message);

    // Check for a CastError, which happens when the id is not a valid ObjectId
    if (err.name === "CastError") {
      return response.status(400).json({ error: "Malformatted ID" });
    }

    response.status(500).json({ error: "Failed to fetch blog" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  try {
    const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    if (blogUpdated) {
      response.status(200).json(blogUpdated);
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    logger.error("Error updating blog:", err.message);

    // Check for a CastError, which happens when the id is not a valid ObjectId
    if (err.name === "CastError") {
      return response.status(400).json({ error: "Malformatted ID" });
    }

    response.status(500).json({ error: "Failed to update blog" });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);
    if (blog) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    logger.error("Error deleting blog:", err.message);

    // Check for a CastError, which happens when the id is not a valid ObjectId
    if (err.name === "CastError") {
      return response.status(400).json({ error: "Malformatted ID" });
    }

    response.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = blogsRouter;
