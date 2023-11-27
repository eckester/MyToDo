import "./Login.css";
import Button from "@mui/material/Button";
import React, { useState } from "react";

function LoginPage() {
  //const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
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
            alert("this is where the redirect goes");
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
                style={{ backgroundColor: "#FFFFFF" }}
              />
              <label htmlFor="username">
                Enter your Password:
              </label>
              <input
                type="text"
                name="password"
                id="password"
                style={{ backgroundColor: "#FFFFFF" }}
              />
              <Button
                className="button"
                variant="outlined"
                type="button"
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
    </div>
  );
}

export default LoginPage;
