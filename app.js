const express = require("express");
const app = express();

app.use(express.json());

let todos = [];
let nextId = 1;

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { task } = req.body;
  const todo = { id: nextId++, task };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});