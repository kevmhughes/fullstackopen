const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "An unexpected error occurred while retrieving users" });
  }
});

usersRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

    // Check for missing required fields and provide specific error messages
    if (!username) {
      return response.status(400).json({ error: "Username is required" });
    }
    if (!password) {
      return response.status(400).json({ error: "Password is required" });
    }
    // Check for inputted data lengths
    if (username.length < 3) {
      return response
        .status(400)
        .json({ error: "Username must be at least 3 characters long" });
    }
    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: "Password must be at least 3 characters long" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: "Username must be unique",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = usersRouter;
