const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', (request, response) => {
    
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(err => {
        logger.error('Error fetching blogs:', err.message)
        response.status(500).json({ error: 'Failed to fetch blogs' })
      })
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(err => {
        logger.error('Error saving blog:', err.message)
        response.status(500).json({ error: 'Failed to save blog' })
      })
    })
  
    module.exports = blogsRouter