import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  CalendarMonth as CalendarMonthIcon,
  Checklist as ChecklistIcon,
  SchoolOutlined as SchoolOutlinedIcon,
  WorkOutline as WorkOutlineIcon,
  ChevronRight as ChevronRightIcon,
  ListAlt as ListAltIcon
} from "@mui/icons-material";

function Sidebar({ setCategoryFilter }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState("All Tasks"); // Set "All Tasks" as the default

  const handleCategoryClick = (category) => {
    if (category === "Calendar") {
      // navigate to calendar page
      navigate("/calendar");
    } else if (category === "To Do List") {
      navigate("/home"); // navigate to To do list page
      setCategoryFilter("All Tasks"); // automatically filters for all tasks
      setSelectedCategory("All Tasks");
    } else {
      navigate("/home"); // navigate to To do list page
      setCategoryFilter(category); // filtetr by category
      setSelectedCategory(category);
    }
  };

  const renderListItems = (categories) => {
    // helper function to filter when category is selected
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
    // helper function to get category icon for display
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
      <Link to="/home" className="SidebarToDoListLink">
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
