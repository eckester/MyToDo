import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useParams } from "react-router-dom";

function MyApp() {
  const [tasks, setTasks] = useState([]);

  function fetchTasks() {
    const promise = fetch(
      "http://mytodo2-307.azurewebsites.net/tasks"
    );
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
    fetch(`http://mytodo2-307.azurewebsites.net/tasks/${id}`, {
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
    const promise = fetch(
      "http://mytodo2-307.azurewebsites.net/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
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
                removeTask={removeOneTask}
                handleSubmit={updateList}
              ></ListPage>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function ListPage(props) {
  const { taskData, removeTask, handleSubmit } = props;
  return (
    <>
      <Table taskData={taskData} removeTask={removeTask} />
      <Form handleSubmit={handleSubmit} />
    </>
  );
}

export default MyApp;
