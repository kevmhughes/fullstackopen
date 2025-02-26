const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;

  // Check for missing required fields and provide specific error messages
  if (!username) {
    return response.status(400).json({ error: "Username is required." });
  }
  if (!password) {
    return response.status(400).json({ error: "Password is required." });
  }

    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "Invalid username or password.",
      });
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    };
  
    const token = jwt.sign(userForToken, process.env.SECRET);
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (err) {
      logger.error("Error logging in:", err.message);
      next(err);
    }
});

module.exports = loginRouter;
