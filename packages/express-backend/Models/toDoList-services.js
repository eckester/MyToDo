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

function sortToDoByPrior() {
  return toDoModel.aggregate([
    {
      $addFields: {
        sortPriority: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: ["$priority", "High"]
                },
                then: 3
              },
              {
                case: {
                  $eq: ["$priority", "Medium"]
                },
                then: 2
              },
              {
                case: {
                  $eq: ["$priority", "Low"]
                },
                then: 1
              }
            ],
            default: 0
          }
        }
      }
    },
    {
      $sort: {
        sortPriority: -1
      }
    }
  ]);
}

function filterCategoryTasks(cat) {
  return toDoModel.find({ category: cat });
}

// function findToDoByDate(date) {
// //return toDoModel.find({ due: date });
// }

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
  //findToDoByDate,
  sortToDoByPrior,
  filterCategoryTasks,
  addTask,
  deleteTask,
  getTasks,
  findTaskById,
  updateTask
};
