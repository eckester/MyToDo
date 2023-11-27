import "./Login.css";
import Button from "@mui/material/Button";
import React, { useState } from "react";

function LoginPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [users, setUser] = useState([
    {
      name: "",
      password: ""
    }
  ]);
  //this.handleInputChange = this.handleInputChange.bind(this);

  function newUser(nam, pass) {
    setUser({
      name: nam,
      password: pass
    });
    handleSubmit(users);
  }

  function handleSubmit(usars) {
    if (usars.length !== 0) {
      alert("smth");
    } else {
      alert("oooh");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username") {
      setUser({
        name: value,
        password: users["password"]
      });
    } else {
      setUser({
        name: users["name"],
        password: value
      });
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
          className="textBox"
          type="text"
        />
        <br />
        <h2 className="center-content">Password</h2>
        <br />
        <input
          style={{ backgroundColor: "#C0C2C4" }}
          className="textBox"
          type="text"
        />
        <br />
        <Button
          bsClass="button"
          variant="contained"
          onClick={() => {
            window.location.href = "/";
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
                // value={this.state.value}
                // onChange={this.handleChange}
                style={{ backgroundColor: "#FFFFFF" }}
              />
              <label htmlFor="username">
                Enter your Password:
              </label>
              <input
                type="text"
                name="password"
                id="password"
                //value={this.state.value}
                onChange={handleChange}
                style={{ backgroundColor: "#FFFFFF" }}
              />
              <Button
                className="button"
                variant="outlined"
                type="button"
                onClick={() => newUser("emm", "123")}
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
      {/*<span>*/}
      {/*  users.map((row, index) =>*/}
      {/*  <tr key={index}>{row.name}</tr>*/}
      {/*</span>*/}
    </div>
  );
}

export default LoginPage;
