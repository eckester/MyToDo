// toDoList-services.js
import mongoose from "mongoose";
//import { toDoModel, users } from "./toDoList.js";
import toDoModel from "./toDoList.js";
import users from "./users.js";
//import users from "./toDoList.js";

import dotenv from "dotenv";

//const toDoModel = require("./toDoList.js");
dotenv.config();

mongoose.set("debug", true);

console.log(">>mongo cluster: ");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((error) => console.log(error));

// is this correct for date? it doesn't use the parameter
function sortToDoByDate(date) {
  return toDoModel.find().sort({ due: 1 });
}

function filterPriorityTasks(prior) {
  return toDoModel.find({ priority: prior });
}

function filterCategoryTasks(cat) {
  return toDoModel.find({ category: cat });
}

function addTask(task) {
  const taskToAdd = new toDoModel(task);
  const promise = taskToAdd.save();
  return promise;
}

function deleteTask(taskId) {
  return toDoModel.findByIdAndDelete(taskId);
}

function getTasks() {
  return toDoModel.find().sort({ due: 1 });
}

function getuserName(name) {
  return user.find({ name: name })._id;
}

function getTasksWID(userid) {
  return toDoModel.find({ user: userid }).sort({ due: 1 });
}

function findTaskById(id) {
  return toDoModel.find({ _id: id });
}

function updateTask(taskId, updatedTask) {
  return toDoModel.findByIdAndUpdate(taskId, updatedTask, {
    new: true
  });
}

// User stuff
function addUser(user) {
  const userToAdd = new users(user);
  const promise = userToAdd.save();
  return promise;
}

function getUsers() {
  return users;
}

export default {
  sortToDoByDate,
  filterCategoryTasks,
  addTask,
  deleteTask,
  getTasks,
  findTaskById,
  updateTask,
  filterPriorityTasks,
  getUsers,
  addUser,
  getTasksWID,
  getuserName
};
