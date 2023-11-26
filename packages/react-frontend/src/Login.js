import React from "react";
import "./Login.css";
import Button from "@mui/material/Button";

//const grey = "#C0C2C4";

function LoginPage() {
  return (
    <div>
      <h1 className="centered-content">Login</h1>
      <span className="box">
        <h2 className="center-content">Username</h2>
        <br />
        <input className="textBox" type="text" />
        <br />
        <h2 className="center-content">Password</h2>
        <br />
        <input className="textBox" type="text" />
        <br />
        <Button bsClass="button" variant="contained">
          Log in
        </Button>
      </span>
    </div>
  );
}

export default LoginPage;
