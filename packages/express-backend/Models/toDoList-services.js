// toDoList-services.js
import mongoose from "mongoose";
import toDoModel from "./toDoList.js";

import dotenv from "dotenv";

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

function findTaskById(id) {
  return toDoModel.find({ _id: id });
}

function updateTask(taskId, updatedTask) {
  return toDoModel.findByIdAndUpdate(taskId, updatedTask, {
    new: true
  });
}

export default {
  sortToDoByDate,
  filterCategoryTasks,
  addTask,
  deleteTask,
  getTasks,
  findTaskById,
  updateTask,
  filterPriorityTasks
};
