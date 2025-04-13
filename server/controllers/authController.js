const User = require("../models/userModel");
const { readData, writeData } = require("../utils/fileUtils");

const USERS_FILE = "users.json";

const registerUser = (req, res) => {
  const { name, email, mobile, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const users = readData(USERS_FILE);
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  const newUser = new User(name, email, mobile, password, role);
  users.push(newUser);
  writeData(USERS_FILE, users);

  res
    .status(201)
    .json({ message: "User registered successfully.", user: newUser });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const users = readData(USERS_FILE);
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful.", user });
};

module.exports = {
  registerUser,
  loginUser,
};
