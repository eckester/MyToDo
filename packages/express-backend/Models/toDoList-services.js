import mongoose from "mongoose";
import toDoModel from "./toDoList";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/myToDo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function sortToDoByDate(date) {
    return toDoModel.find().sort({ due: 1 });
}

function findToDoByDate(date) {
    return toDoModel.find({ due: date });
}

function addTask(inTask) {
    const taskToAdd = new toDoModel(inTask);
    const promise = taskToAdd.save();
    return promise;
}

function deleteTask(inTask) {
    const taskToDelete = toDoModel.deleteOne({task: inTask})
}

export default {
    sortToDoByDate,
    findToDoByDate,
    addTask,
    deleteTask,
};