let todos = [];
let nextId = 1;

// 1. Health Check - ضروري جداً لعملية الـ Deployment في AWS
app.get("/", (req, res) => {
  res.status(200).json({ status: "UP", message: "Server is running smoothly!" });
});

// 2. Get All Todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 3. Post Todo - مع إضافة تحقق بسيط (Validation)
app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task content is required" });
  }

  const todo = { id: nextId++, task };
  todos.push(todo);
  res.status(201).json(todo);
});

// 4. Delete Todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  
  todos = todos.filter((t) => t.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});