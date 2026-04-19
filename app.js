// 1. استدعاء مكتبة Express
const express = require('express'); 

// 2. تعريف التطبيق (هذا السطر سيحل مشكلة 'app' is not defined)
const app = express();

// 3. إضافة Middleware لقراءة بيانات الـ JSON (ضروري ليعمل req.body)
app.use(express.json());

// 4. تعريف المنفذ (هذا السطر سيحل مشكلة 'PORT' is not defined)
 const PORT = process.env.PORT || 80;
//for testing pirposes
let todos = [];
let nextId = 1;

// --- الأكواد الخاصة بك تبدأ من هنا ---

// 1. Health Check
app.get("/", (req, res) => {
  res.status(200).json({ status: "UP", message: "Server is running smoothly!" });
});

// 2. Get All Todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 3. Post Todo
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

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});