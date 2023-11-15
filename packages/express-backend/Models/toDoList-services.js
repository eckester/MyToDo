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

function sortToDoByDate(date) {
  return toDoModel.find().sort({ due: 1 });
}

function filterCategoryTasks(cat) {
  return toDoModel.find().sort({ category: cat });
}

//function findToDoByDate(date) {
//return toDoModel.find({ due: date });
//}

function addTask(task) {
  const taskToAdd = new toDoModel(task);
  const promise = taskToAdd.save();
  return promise;
}

function deleteTask(taskId) {
  return toDoModel.findByIdAndDelete(taskId);
}

function getTasks() {
  return toDoModel.find();
}

function findTaskById(id) {
  return toDoModel.find({ _id: id });
}

export default {
  sortToDoByDate,
  //findToDoByDate,
  filterCategoryTasks,
  addTask,
  deleteTask,
  getTasks,
  findTaskById
};
