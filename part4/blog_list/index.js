const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

// Function to connect to the database
async function connectDB() {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to the database')
  } catch (error) {
    logger.error('Database connection error:', error.message)
  }
}

// Call the connectDB function and catch any errors
connectDB().catch((err) => logger.log(err))

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})