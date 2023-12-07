// /src/header.js

import React from "react";
import "./header.css";
import { ListAlt as ListAltIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="Header">
      <h1>OnTrack</h1>
      <Link to="/login" className="SidebarToDoListLink">
        <ListAltIcon
          style={{ justifyContent: screenLeft }}
          className="Icon"
          onClick={props.handleClick}
        />
      </Link>
    </div>
  );
}

export default Header;
