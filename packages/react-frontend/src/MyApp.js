import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useParams } from "react-router-dom";

function MyApp() {
  const [tasks, setTasks] = useState([]);
  //const [overdueTasks, setTasks] = useState([]);

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
    const updated = tasks.filter(
      (task) => task._id !== tasker._id
    );
    setTasks([...updated, tasker]);

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
    <div className="container">
      <Header />
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
              ></ListPage>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ListPage(props) {
  const {
    taskData,
    task2Data,
    removeTask,
    handleSubmit,
    updateTask
  } = props;
  //task2Data = fetchOverDue(taskData);
  return (
    <>
      <Table
        taskData={taskData}
        task2Data={task2Data}
        removeTask={removeTask}
        updateTask={updateTask}
      />
      <Form handleSubmit={handleSubmit} />
    </>
  );
}

export default MyApp;
