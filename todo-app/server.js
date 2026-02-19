const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const TODO_FILE = path.join(__dirname, "todos.json");

/* ---------------- MIDDLEWARE ---------------- */

app.use(express.json());
app.use(express.static("public"));

/* ---------------- HELPERS ---------------- */

function readTodos() {
  if (!fs.existsSync(TODO_FILE)) return [];
  return JSON.parse(fs.readFileSync(TODO_FILE, "utf-8") || "[]");
}

function writeTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

/* ---------------- ROUTES ---------------- */

app.get("/api/todos", (req, res) => {
  res.json(readTodos());
});

app.post("/api/todos", (req, res) => {
  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    task: req.body.task,
    done: false
  };

  todos.push(newTodo);
  writeTodos(todos);

  res.json(newTodo);
});

app.put("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id == req.params.id);

  if (!todo) return res.status(404).json({ error: "Not found" });

  todo.done = !todo.done;
  writeTodos(todos);

  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todos = readTodos().filter(t => t.id != req.params.id);
  writeTodos(todos);
  res.json({ success: true });
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});