// utils/logger.js

// Simple info logging function
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
  }
  
  // Simple error logging function
  const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
      console.error(...params)
    }
  }
  
  module.exports = {
    info,
    error
  }
  