// /src/header.js

import React from "react";
import "./header.css";
import { ListAlt as ListAltIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="Header">
      <h1>OnTrack</h1>
      <Link to="/login" className="SidebarToDoListLink">
        <ListAltIcon
          style={{ justifyContent: screenLeft }}
          className="Icon"
          onClick={handleClick}
        />
      </Link>
    </div>
  );
}

export default Header;
