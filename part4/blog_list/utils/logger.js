// utils/logger.js

// Simple info logging function
const info = (...params) => {
    console.log(...params)
  }
  
  // Simple error logging function
  const error = (...params) => {
    console.error(...params)
  }
  
  module.exports = {
    info,
    error
  }
  