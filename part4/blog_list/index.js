const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.json("this will be the bloglist app")
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// Function to connect to the database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to the database')
  } catch (error) {
    console.error('Database connection error:', error.message)
  }
}

// Call the connectDB function and catch any errors
connectDB().catch((err) => console.log(err))


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})