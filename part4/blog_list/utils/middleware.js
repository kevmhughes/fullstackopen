const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  // Extract the token from the Authorization header
  const authorization = request.headers["authorization"];

  if (authorization && authorization.startsWith("Bearer ")) {
    // Remove the 'Bearer ' part and get the token
    const token = authorization.slice(7);

    // Attach the token to the request object
    request.token = token;
  }

  // Call the next middleware function in the stack
  next();
};

const userExtractor = async (request, response, next) => {
  // Extract the token from the Authorization header
  const authorization = request.headers["authorization"];

  if (authorization && authorization.startsWith("Bearer ")) {
    // Remove the 'Bearer ' part and get the token
    const token = authorization.slice(7);

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // If the token is invalid or not present, return an error
    if (!decodedToken.id) {
      return response.status(401).json({ error: "Token invalid or missing" });
    }

    // Find the user based on the decoded token's id
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // Attach the user to the request object
    request.user = user;
  }

  // Call the next middleware function in the stack
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  // Catch-all for any other error (usually server errors)
  response.status(500).json({ error: "something went wrong on the server" });

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
