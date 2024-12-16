const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.status(200).json(blogs);
  } catch (err) {
    logger.error("Error fetching blogs:", err.message);
    next(err);
  }
});

blogsRouter.post("/", async (request, response, next) => {
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

  // get user from request object
  const user = request.user;

  // Get the token from the request
  const token = request.token;

  if (!token) {
    return response.status(401).json({ error: "Token missing" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = new Blog({
    title,
    url,
    author,
    likes: likes || 0, // Default likes to 0 if not provided
    user: user.id,
  });

  try {
    const postedBlog = await blog.save();
    user.blogs = user.blogs.concat(postedBlog._id);
    await user.save();
    response.status(201).json(postedBlog);
  } catch (err) {
    logger.error("Error saving blog:", err.message);
    next(err);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
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

    next(err);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
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

    next(err);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  // Check if the ID is valid (valid ObjectId format)
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    return response.status(400).json({ error: "Malformatted ID" });
  }

  const blogIdToDelete = request.params.id;
  // get user from request object
  const user = request.user;
  // Get the token from the request
  const token = request.token;

  if (!token) {
    return response.status(401).json({ error: "Token missing" });
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    // Ensure the blog is associated with the user
    const blogToDelete = await Blog.findById(blogIdToDelete);
    if (!blogToDelete) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blogToDelete.user.toString() !== decodedToken.id) {
      return response
        .status(403)
        .json({ error: "Unauthorized to delete this blog" });
    }

    // Delete the blog from Blog model
    await Blog.findByIdAndDelete(blogIdToDelete);

    // Remove the blog reference from the user's blogs array
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== blogIdToDelete
    );
    await user.save();

    response.status(204).end();
  } catch (err) {
    logger.error("Error deleting blog:", err.message);

    // Check for a CastError, which happens when the id is not a valid ObjectId
    if (err.name === "CastError") {
      return response.status(400).json({ error: "Malformatted ID" });
    }

    next(err);
  }
});

module.exports = blogsRouter;
