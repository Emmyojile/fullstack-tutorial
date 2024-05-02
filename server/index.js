// const http = require("http");
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("Hello World");
// });
// const PORT = 8000;
// app.listen(PORT);
// console.log(`Server listening on ${PORT}`);

//Express server

const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();

// Middleware to parse incoming request bodies as JSON
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const User = require("./models/user");
const Note = require("./models/note");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  next();
});

//db.js
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });


// REGISTER A USER
app.post("/register", async (req, res) => {
  const { email, userName, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this Email or Username already exists" });
  }

  const user = new User({ email, userName, password });

  try {
    await user.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// LOGIN A USER
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User with email does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Wrong Password" });
  }

  const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: '3600s' });
  
  res.status(200).json({ message: "Logged in Successfully", token, user: { userName: user.userName } });
});

// GET ALL NOTES
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find(); // Fetch all notes from database
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET A SINGLE NOTE
app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.findById(id); // Find note by ID
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE A NOTE
app.post("/notes", async (req, res) => {
  const newNote = new Note(req.body); // Create a new note instance

  try {
    const savedNote = await newNote.save(); // Save the note to database
    res.status(201).json(savedNote); // Send the saved note
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating note" }); // Handle validation errors
  }
});

// UPDATE A NOTE
app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, updates, {
      new: true,
    }); // Find and update with options
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating note" }); // Handle validation errors
  }
});

// DELETE A NOTE
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedNote = await Note.findByIdAndDelete(id); // Find and delete by ID
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
