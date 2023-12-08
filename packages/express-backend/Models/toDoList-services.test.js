import mongoose from "mongoose";
import Task from "./toDoList-services.js";
import db from "./dbTest.js";

const taskData1 = {
  task: "test0",
  category: "School",
  priority: "High",
  due: Date("April 17, 2025"),
  status: false,
  class: "CSC 349"
};

const taskData2 = {
  task: "test1",
  category: "Work",
  priority: "Low",
  status: false
};

const taskData3 = {
  task: "test2",
  category: "School",
  priority: "High",
  due: Date("December 17, 1995"),
  status: false,
  class: "CSC 307"
};

const update1 = {
  task: "test0",
  category: "School",
  priority: "Medium",
  due: Date("April 17, 2025"),
  status: false,
  class: "CSC 349"
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

/**
 * Simple Task Model
 */
test("Testing Adding Tasks & Updating -- success", async () => {
  //Set up simple data set
  await Task.addTask(taskData1);
  await Task.addTask(taskData2);
  await Task.addTask(taskData3);
  //Check data has been added
  const currTasks = await Task.getTasks();
  expect(currTasks.length).toBe(3);
  //Check data is correct
  expect(currTasks[2].task).toBe("test2");
  expect(currTasks[1].priority).toBe("High");
  //Test updateTask
  await Task.updateTask(currTasks[1]._id, update1);
  const updatedTasks = await Task.getTasks();
  expect(updatedTasks[1].priority).toBe("Medium");
});

/**
 * Simple Task Model
 */
test("Testing deleting and find by Id-- success", async () => {
  //Set up simple data set
  await Task.addTask(taskData1);
  await Task.addTask(taskData2);
  await Task.addTask(taskData3);
  //Check current length of lists
  const currTasks = await Task.getTasks();
  expect(currTasks.length).toBe(3);
  //Delete a task
  const deleted = await Task.deleteTask(currTasks[2]._id);
  const deletedTasks = await Task.getTasks();
  //Test task is gone
  expect(deletedTasks.length).toBe(2);
  expect(deletedTasks[0].isOverdue).toBe(false);
  let testTask = await Task.findTaskById(deletedTasks[0]._id);
  expect(testTask).toContainEqual(deletedTasks[0]);
});

test("Testing Filtering and Sorting -- success", async () => {
  //Set up simple data set
  await Task.addTask(taskData1);
  await Task.addTask(taskData2);
  await Task.addTask(taskData3);
  //Filter by Category
  const schoolTasks = await Task.filterCategoryTasks("Work");
  expect(schoolTasks.pop().task).toContain("test1");
  //Filter by Priority
  const priorityTasks = await Task.filterPriorityTasks("Low");
  expect(priorityTasks.pop().task).toBe("test1");
  //sort by date
  const dateTasks = await Task.sortToDoByDate("Low");
  expect(dateTasks.pop().task).toBe("test2");
  expect(dateTasks.pop().task).toBe("test0");
  expect(dateTasks.pop().task).toBe("test1");
});
