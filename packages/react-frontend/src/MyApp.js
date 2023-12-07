import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./header";
import Sidebar from "./Sidebar";
import LoginPage from "./Login";
import MyCalendar from "./MyCalendar";
//import toDoListServices from "./models/toDoList-services.js";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
// { useNavigate } from "react-router-dom";

//import { useParams } from "react-router-dom";

//const host = "http://localhost:8000";

function MyApp() {
  const [tasks, setTasks] = useState([]);
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(0);
  //const [returned, setReturned] = useState(false);

  const [categoryFilter, setCategoryFilter] =
    useState("All Tasks");
  const [tasksLoaded, setTasksLoaded] = useState(false);
  //const navigate = useNavigate();

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
    const promise = fetch(
      `http://localhost:8000/user/tasks/${userId}`,
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

  function fetchUserId(name) {
    const promise = fetch(
      `http://localhost:8000/user/${name}`,
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

  useEffect(() => {
    console.log("useEffect");
    if (userId === 0) {
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
      fetchTasksId(userId)
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
  }, [token]);

  // function handleClick() {
  //   const navigate = useNavigate();
  //   navigate("/login");
  // }

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
    const promise = fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
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
          console.log("boohoo");
          alert("baaaa");
          response.json().then((payload) => {
            alert(payload.username);
            console.log("Payload", payload);
            setToken(payload.token);
            console.log(payload.username);
            fetchUserId(payload.username).then((response) => {
              console.log("re", response);
              response.json().then((res) => {
                alert(res._id);
                setUserId(res._id);
              });
            });
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
                <Header
                  handleClick={() => useNavigate("/login")}
                />
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
                    handleClick={() => useNavigate("/login")}
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
            path="/login"
            element={
              <>
                <Header
                  handleClick={() => useNavigate("/login")}
                />
                <LoginPage handleSubmit={loginUser} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header
                  handleClick={() => useNavigate("/login")}
                />
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
      categoryFilter
    } = props;

    setTasks(tasks);

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
        <Form handleSubmit={handleSubmit} />
      </>
    );
  }
}

export default MyApp;

// Users!!!
// function fetchUsers() {
//   return users;
// }

// function fetchUsers() {
//   // const promise = fetch("http://localhost:8000/users");
//   // return promise;
//     return users;
// }
// useEffect(() => {
//   fetchUsers()
//     .then((res) => res.json())
//     .then((json) => {
//       setUsers(json["users"]);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);

// function updateUsers(user) {
//   setUsers([...users, user]);
//   // const promise = fetch("http://localhost:8000/users", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json"
//   //   },
//   //   body: JSON.stringify(user)
//   // });
//   // return promise;
// }
