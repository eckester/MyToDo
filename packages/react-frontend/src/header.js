// /src/header.js

import React from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="Header">
      <h1>OnTrack</h1>
      <Link to="/" className="SidebarToDoListLink">
        <ExitToAppIcon
          style={{ justifyContent: screenLeft }}
          className="Icon"
          onClick={handleClick}
        />
      </Link>
    </div>
  );
}

export default Header;
