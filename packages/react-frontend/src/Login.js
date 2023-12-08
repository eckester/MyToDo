import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
    navigate("/home");
  }

  return (
    <div>
      <h1 className="centered-content">
        {props.buttonLabel || "Log In"}
      </h1>
      <form className="box">
        <label htmlFor="username" className="center-content">
          Username
        </label>
        <br />
        <input
          style={{ backgroundColor: "#F3F8FF" }}
          name="username"
          id="username"
          value={creds.username}
          onChange={handleChange}
          className="textBox"
          type="text"
        />
        <br />
        <label htmlFor="password" className="center-content">
          Password
        </label>
        <br />
        <input
          style={{ backgroundColor: "#F3F8FF" }}
          className="textBox"
          id="password"
          name="password"
          value={creds.pwd}
          onChange={handleChange}
          type="password"
        />
        <br style={{ alignContent: "center" }} />
        <input
          type="button"
          value={props.buttonLabel || "Log In"}
          onClick={submitForm}
        />
      </form>
      <br />
      <p
        className={"centered-content-button"}
        onClick={() => navigate("/signup")}
      >
        No account? Create one&nbsp;<b>here</b>
      </p>
    </div>
  );
}

export default LoginPage;
