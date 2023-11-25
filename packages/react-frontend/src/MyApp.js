import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./header";
import Sidebar from "./Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useParams } from "react-router-dom";

function MyApp() {
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] =
    useState("All Tasks");

  function fetchTasks() {
    const promise = fetch("http://localhost:8000/tasks");
    return promise;
  }
  useEffect(() => {
    fetchTasks()
      .then((res) => res.json())
      .then((json) => setTasks(json["toDoList"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneTask(id) {
    const updated = tasks.filter((task) => task._id !== id);
    setTasks(updated);
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status === 204) {
          const updated = tasks.filter(
            (task) => task.id !== id
          );
          setTasks(updated);
        } else if (response.status === 404) {
          console.log("Task not found");
        } else {
          console.log(
            "Failed to delete with status code: ",
            response.status
          );
        }
      })
      .catch((error) => {
        console.log("Error while deleting: ", error);
      });
  }

  function updateList(task) {
    setTasks([...tasks, task]);
    postTask(task)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log(
            "Task insertion failed with status code:",
            response.status
          );
          return {};
        }
      })
      .then((newTask) => {
        if (newTask) {
          setTasks([...tasks, newTask]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function postTask(task) {
    const promise = fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });
    return promise;
  }

  function updateTask(tasker) {
    const i = tasks.indexOf((task) => task._id === tasker._id);
    const first = tasks.slice(0, i);
    const after = tasks.slice(i + 1, tasks.length);
    setTasks([...first, tasker]);
    setTasks([tasks, ...after]);

    const promise = fetch(
      `http://localhost:8000/tasks/${tasker._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tasker)
      }
    );
    return promise;
  }

  return (
    <div className="header-container">
      <Header />
      <div className="content-container">
        <Sidebar setCategoryFilter={setCategoryFilter} />
        <div className="content-tasks">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ListPage
                    taskData={tasks}
                    task2Data={tasks}
                    removeTask={removeOneTask}
                    handleSubmit={updateList}
                    updateTask={updateTask}
                    categoryFilter={categoryFilter}
                  ></ListPage>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

function ListPage(props) {
  const {
    taskData,
    task2Data,
    removeTask,
    handleSubmit,
    updateTask,
    categoryFilter
  } = props;

  const filteredTasks =
    categoryFilter === "All Tasks"
      ? taskData
      : taskData.filter(
          (task) => task.category === categoryFilter
        );

  return (
    <>
      <Table
        taskData={filteredTasks}
        task2Data={task2Data}
        removeTask={removeTask}
        updateTask={updateTask}
      />
      <Form handleSubmit={handleSubmit} />
    </>
  );
}

export default MyApp;
