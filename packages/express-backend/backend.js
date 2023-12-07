// backend.js
import express from "express";
import cors from "cors";
import toDoListServices from "./models/toDoList-services.js";
import {
  authenticateUser,
  registerUser,
  loginUser
} from "./auth.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get tasks (all, category, priority, date)
app.get("/tasks", authenticateUser, async (req, res) => {
  //alert("get the tasks");
  const { category, priority, date } = req.query;
  try {
    let result;
    if (category) {
      result =
        await toDoListServices.filterCategoryTasks(category);
    } else if (priority) {
      result =
        await toDoListServices.filterPriorityTasks(priority);
    } else if (date) {
      result = await toDoListServices.sortToDoByDate(date);
    } else {
      console.log("here yee");
      result = await toDoListServices.getTasks();
    }
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send({ toDoList: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// get task by id
app.get("/tasks/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  const result = await toDoListServices.findTaskById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ toDoList: result });
  }
});

app.get(
  "user/tasks/:id",
  authenticateUser,
  async (req, res) => {
    const id = req.params.id;
    const result = await toDoListServices.getTasksWID(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send({ toDoList: result });
    }
  }
);

app.get("user/:name", authenticateUser, async (req, res) => {
  const id = req.params.name;
  const result = await toDoListServices.getuserName(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ _id: result });
  }
});

// add task
app.post("/tasks", authenticateUser, async (req, res) => {
  const task = req.body;
  const newTask = await toDoListServices.addTask(task);

  if (newTask) res.status(201).json(newTask);
  else res.status(500).end();
});

// Delete a task by ID
app.delete("/tasks/:id", authenticateUser, async (req, res) => {
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

// edit existing task by ID
app.put("/tasks/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;

  try {
    const result = await toDoListServices.updateTask(
      id,
      updatedTask
    );
    if (!result) {
      res.status(404).send("Task not found.");
    } else {
      res.send({
        message: "Task updated successfully.",
        updatedTask: result
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred in the server.");
  }
});

// Users
app.get("/users", authenticateUser, async (req, res) => {
  const result = await toDoListServices.getUsers();
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users: result });
  }
});
//
app.post("/users", async (req, res) => {
  const user = req.body;
  const newUser = await toDoListServices.addUser(user);

  if (newUser) res.status(201).json(newUser);
  else res.status(500).end();
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
