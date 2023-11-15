// backend.js
import express from "express";
import cors from "cors";
import toDoListServices from "./models/toDoList-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await toDoListServices.getTasks();
    res.send({ toDoList: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// get task by id
app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const result = await toDoListServices.findTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ toDoList: result });
  }
});

// add task
app.post("/tasks", async (req, res) => {
  const task = req.body;
  const newTask = await toDoListServices.addTask(task);

  if (newTask) res.status(201).json(newTask);
  else res.status(500).end();
});

// Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTask = await toDoListServices.deleteTask(id);
    if (!deletedTask) {
      res.status(404).send("Task not found.");
    } else {
      res.send({
        message: "Task deleted successfully.",
        deletedTask
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening`);
});
