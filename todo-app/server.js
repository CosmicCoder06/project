const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Absolute path to todos file
const TODO_FILE = path.join(__dirname, "todos.json");

// Middleware
app.use(express.json());

// Serve static files correctly
app.use(express.static(path.join(__dirname, "public")));

// ✅ Root route fix (guaranteed to work)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🧠 Safe read function (no crashes)
function readTodos() {
  try {
    if (!fs.existsSync(TODO_FILE)) return [];
    const data = fs.readFileSync(TODO_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("❌ Error reading todos:", err);
    return [];
  }
}

// 🧠 Safe write
function writeTodos(todos) {
  try {
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error("❌ Error writing todos:", err);
  }
}

// 📌 Routes

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(readTodos());
});

// Add todo
app.post("/api/todos", (req, res) => {
  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    task: req.body.task || "Untitled Task",
    done: false
  };

  todos.push(newTodo);
  writeTodos(todos);

  res.json(newTodo);
});

// Toggle done
app.put("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id == req.params.id);

  if (!todo) {
    return res.status(404).json({ error: "Not found" });
  }

  todo.done = !todo.done;
  writeTodos(todos);

  res.json(todo);
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const filtered = todos.filter(t => t.id != req.params.id);

  writeTodos(filtered);
  res.json({ success: true });
});

// 🚀 Start server (with error catch)
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});
