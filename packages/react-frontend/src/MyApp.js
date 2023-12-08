import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./header";
import Sidebar from "./Sidebar";
import LoginPage from "./Login";
import MyCalendar from "./MyCalendar";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

function MyApp() {
  const [tasks, setTasks] = useState([]);
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All Tasks");
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    if (userName === "") {
      console.log("noid");
      fetchTasks()
        .then((res) =>
          res.status === 200 ? res.json() : undefined
        )
        .then((json) => {
          if (json) {
            setTasks(json["toDoList"]);
            setTasksLoaded(true); // Set tasksLoaded to true when tasks are fetched
          } else {
            setTasks(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("IDDDD");
      fetchTasksId()
        .then((res) =>
          res.status === 200 ? res.json() : undefined
        )
        .then((json) => {
          if (json) {
            setTasks(json["toDoList"]);
            setTasksLoaded(true); // Set tasksLoaded to true when tasks are fetched
          } else {
            setTasks(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, userName]);

  function fetchTasks() {
    const promise = fetch(
      "http://localhost:8000/tasks",
      {
        method: "GET",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        })
      }
      //"https://black-beach-0a186661e.4.azurestaticapps.net"
    );
    return promise;
  }

  function fetchTasksId() {
    // alert("fetch user tasks", userName);
    const promise = fetch(
      `http://localhost:8000/user/tasks/${userName}`,
      {
        method: "GET",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        })
      }
      //"https://black-beach-0a186661e.4.azurestaticapps.net"
    );
    return promise;
  }

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
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
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

  function loginUser(creds) {
    console.log(JSON.stringify(creds));
    const promise = fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => {
            alert("here yee here yee");
            setToken(payload.token);
            setUserName(payload.username);
            return 200;
          });
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function signupUser(creds) {
    const promise = fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        console.log("Respomse", response);
        if (response.status === 201) {
          response.json().then((payload) => {
            alert(payload.username);
            console.log("Payload", payload);
            setToken(payload.token);
            setUserName(payload.username);
          });
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
        alert(message);
      });

    return promise;
  }

  return (
    <div className="header-container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header handleClick={() => useNavigate("/")} />
                <LoginPage handleSubmit={loginUser} />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Header handleClick={() => useNavigate("/")} />
                <div className="content-container">
                  <Sidebar
                    setCategoryFilter={setCategoryFilter}
                  />
                  <div className="content-tasks">
                    <ListPage
                      removeTask={removeOneTask}
                      handleSubmit={updateList}
                      updateTask={updateTask}
                      categoryFilter={categoryFilter}
                      userName={userName}
                    ></ListPage>
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              tasksLoaded && ( // Render MyCalendar only if tasks are loaded
                <>
                  <Header
                    handleClick={() => useNavigate("/")}
                  />
                  <div className="content-container">
                    <Sidebar
                      setCategoryFilter={setCategoryFilter}
                    />
                    <MyCalendar
                      className="calendar-container"
                      tasks={tasks}
                    />
                  </div>
                </>
              )
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header handleClick={() => useNavigate("/")} />
                <LoginPage
                  handleSubmit={signupUser}
                  buttonLabel="Sign Up"
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );

  function ListPage(props) {
    const {
      removeTask,
      handleSubmit,
      updateTask,
      categoryFilter,
      userName
    } = props;

    const filteredTasks =
      categoryFilter === "All Tasks"
        ? tasks
        : tasks.filter(
            (task) => task.category === categoryFilter
          );

    return (
      <>
        <Table
          taskData={filteredTasks}
          task2Data={tasks}
          removeTask={removeTask}
          updateTask={updateTask}
        />
        <Form name={userName} handleSubmit={handleSubmit} />
      </>
    );
  }
}

export default MyApp;
