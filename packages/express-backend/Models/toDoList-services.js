// toDoList-services.js
import mongoose from "mongoose";
//import { toDoModel, users } from "./toDoList.js";
import scheme from "./toDoList.js";
//import users from "./toDoList.js";

import dotenv from "dotenv";

dotenv.config();

mongoose.set("debug", true);

console.log(">>mongo cluster: ");

//***** Comment out for testing DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((error) => console.log(error));
//***** END comment out for testing DB

// is this correct for date? it doesn't use the parameter
function sortToDoByDate(date) {
  return scheme.toDoModel.find().sort({ due: 1 });
}

function filterPriorityTasks(prior) {
  return scheme.toDoModel.find({ priority: prior });
}

function filterCategoryTasks(cat) {
  return scheme.toDoModel.find({ category: cat });
}

function addTask(task) {
  const taskToAdd = new scheme.toDoModel(task);
  const promise = taskToAdd.save();
  return promise;
}

function deleteTask(taskId) {
  return scheme.toDoModel.findByIdAndDelete(taskId);
}

function getTasks() {
  return scheme.toDoModel.find().sort({ due: 1 });
}

function findTaskById(id) {
  return scheme.toDoModel.find({ _id: id });
}

function updateTask(taskId, updatedTask) {
  return scheme.toDoModel.findByIdAndUpdate(
    taskId,
    updatedTask,
    {
      new: true
    }
  );
}

// User stuff
// function addUser(user) {
//   const userToAdd = new scheme.users(user);
//   const promise = userToAdd.save();
//   return promise;
// }

// function getUsers() {
//   return scheme.users;
// }

export default {
  sortToDoByDate,
  filterCategoryTasks,
  addTask,
  deleteTask,
  getTasks,
  findTaskById,
  updateTask,
  filterPriorityTasks,
  //getUsers
};
