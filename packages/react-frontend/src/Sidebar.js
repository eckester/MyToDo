import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ setCategoryFilter }) {
  const [selectedCategory, setSelectedCategory] =
    useState("All Tasks"); // Set "All Tasks" as the default

  const handleCategoryClick = (category) => {
    if (category === "Calendar") {
      window.location.href = "/calendar";
    } else if (category === "To Do List") {
      window.location.href = "/";
    } else {
      setCategoryFilter(category);
      setSelectedCategory(category);
    }
  };

  return (
    <div className="Sidebar">
      <Link to="/" className="SidebarToDoListLink">
        <li
          className={
            selectedCategory === "To Do List" ? "active" : ""
          }
          onClick={() => handleCategoryClick("To Do List")}
        >
          To Do List
        </li>
      </Link>
      <ul className="SidebarList">
        <li
          className={
            selectedCategory === "All Tasks" ? "active" : ""
          }
          onClick={() => handleCategoryClick("All Tasks")}
        >
          All Tasks
        </li>
        <li
          className={
            selectedCategory === "School" ? "active" : ""
          }
          onClick={() => handleCategoryClick("School")}
        >
          School
        </li>
        <li
          className={
            selectedCategory === "Work" ? "active" : ""
          }
          onClick={() => handleCategoryClick("Work")}
        >
          Work
        </li>
        <li
          className={
            selectedCategory === "Other" ? "active" : ""
          }
          onClick={() => handleCategoryClick("Other")}
        >
          Other
        </li>
      </ul>
      <Link to="/calendar" className="SidebarCalendarLink">
        <li
          className={
            selectedCategory === "Calendar" ? "active" : ""
          }
          onClick={() => handleCategoryClick("Calendar")}
        >
          Calendar
        </li>
      </Link>
    </div>
  );
}

export default Sidebar;
