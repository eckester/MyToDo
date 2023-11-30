import "./Login.css";
import Button from "@mui/material/Button";
import React, { useState } from "react";

function LoginPage(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [user1, setUser1] = useState({
    name: "",
    password: ""
  });

  function addUser() {
    props.handleSubmit(user1);
    setUser1({
      name: "",
      password: ""
    });
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username") {
      setUser1({
        name: value,
        password: user1["password"]
      });
    } else {
      setUser1({
        name: user1["name"],
        password: value
      });
    }
  }

  const genUsers = (users) =>
    users.map((row, index) => (
      <tr key={index}>
        Name: {row.name}
        Password: {row.password}
      </tr>
    ));

  function login(testName, testPass) {
    let exists = false;
    for (let i = 0; i < props.userData.length; i++) {
      if (
        props.userData[i].name === testName &&
        props.userData[i].password === testPass
      ) {
        exists = true;
      }
    }

    if (exists) {
      window.location.href = "/";
    } else {
      alert("invalid username/pass");
    }
  }

  return (
    <div>
      <h1 className="centered-content">Login</h1>
      <span className="box">
        <h2 className="center-content">Username</h2>
        <br />
        <input
          style={{ backgroundColor: "#C0C2C4" }}
          id="testName"
          className="textBox"
          type="text"
        />
        <br />
        <h2 className="center-content">Password</h2>
        <br />
        <input
          style={{ backgroundColor: "#C0C2C4" }}
          className="textBox"
          id="testPass"
          type="text"
        />
        <br />
        <Button
          bsClass="button"
          variant="contained"
          onClick={() => {
            login(
              document.getElementById("testName").value,
              document.getElementById("testPass").value
            );
          }}
        >
          Log in
        </Button>
        <br />
        <p
          className={"centered-content"}
          onClick={() => setShowPopup(true)}
        >
          No account? Create one&nbsp;<b>here</b>
        </p>
        {showPopup && (
          <div
            className="sign-in"
            style={{ backgroundColor: "#ccd5e8" }}
          >
            <form>
              <label htmlFor="username">
                Enter your Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                style={{ backgroundColor: "#FFFFFF" }}
              />
              <label htmlFor="username">
                Enter your Password:
              </label>
              <input
                type="text"
                name="password"
                id="password"
                onChange={handleChange}
                style={{ backgroundColor: "#FFFFFF" }}
              />
              <Button
                className="button"
                variant="outlined"
                type="button"
                onClick={() => addUser()}
              >
                Submit
              </Button>
              <Button
                className="button"
                variant="outlined"
                type="button"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </Button>
            </form>
          </div>
        )}
      </span>
      <span>{genUsers(props.userData)}</span>
    </div>
  );
}

export default LoginPage;
