// REST-API

const express = require("express");
const cors = require("cors");

// Initialize App
const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:${PORT}");
});

let tasks = [];
let nextId = 1;

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task, then saves it to the tasks array
app.post("/tasks", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const newTask = {
    id: nextId++,
    name,
    description,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Check if the request body contains the name and description fields
  const { name, description } = req.body;
  if (name) {
    task.name = name;
  }
  if (description) {
    task.description = description;
  }
  res.json(task);
});
