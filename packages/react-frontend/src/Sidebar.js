import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar({ setCategoryFilter }) {
  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    setSelectedCategory(category);
  };

  return (
    <div className="Sidebar">
      <div className="SidebarTitle">Categories</div>
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
      <li>Calendar</li>
    </div>
  );
}

export default Sidebar;
