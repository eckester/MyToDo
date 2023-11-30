import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListAltIcon from "@mui/icons-material/ListAlt";
import "./Sidebar.css";

function Sidebar({ setCategoryFilter }) {
  const [selectedCategory, setSelectedCategory] =
    useState("All Tasks"); // Set "All Tasks" as the default

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === "Calendar") {
      navigate("/calendar");
    } else if (category === "To Do List") {
      navigate("/");
      setCategoryFilter("All Tasks");
      setSelectedCategory("All Tasks");
    } else {
      navigate("/");
      setCategoryFilter(category);
      setSelectedCategory(category);
    }
  };

  const renderListItems = (categories) => {
    return categories.map((category) => (
      <li
        key={category}
        className={
          selectedCategory === category ? "active" : ""
        }
        onClick={() => handleCategoryClick(category)}
      >
        <div className="IconWrapper">
          {getCategoryIcon(category)}
          <span>{category}</span>
        </div>
      </li>
    ));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "All Tasks":
        return <ListAltIcon className="Icon" />;
      case "School":
        return <SchoolOutlinedIcon className="Icon" />;
      case "Work":
        return <WorkOutlineIcon className="Icon" />;
      case "Other":
        return <ChevronRightIcon className="Icon" />;
      default:
        return null;
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
          <div className="IconWrapper">
            <ChecklistIcon className="Icon" />
            <span>To Do List</span>
          </div>
        </li>
      </Link>
      <ul className="SidebarList">
        {renderListItems([
          "All Tasks",
          "School",
          "Work",
          "Other"
        ])}
      </ul>
      <Link to="/calendar" className="SidebarCalendarLink">
        <li
          className={
            selectedCategory === "Calendar" ? "active" : ""
          }
          onClick={() => handleCategoryClick("Calendar")}
        >
          <div className="IconWrapper">
            <CalendarMonthIcon className="Icon" />
            <span className="CalendarTitle">Calendar</span>
          </div>
        </li>
      </Link>
    </div>
  );
}

export default Sidebar;
