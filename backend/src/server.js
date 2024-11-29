// REST-API

const express = require("express");
const cors = require("cors");
const fs = require("fs");

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

// Load tasks from data.json
if (fs.existsSync("data.json")) {
  const data = fs.readFileSync("data.json", "utf-8");
  tasks = JSON.parse(data);

  // Set nextId to the highest existing id + 1
  if (tasks.length > 0) {
    nextId = Math.max(...tasks.map((task) => task.id)) + 1;
  }
}

function saveTasks() {
  fs.writeFileSync("data.json", JSON.stringify(tasks, null, 2));
}

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
    id: nextId,
    name,
    description,
  };
  nextId++;

  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  // Find the task with the given id
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

  // Return the updated task
  saveTasks();
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  saveTasks();
  res.status(204).send();
});
