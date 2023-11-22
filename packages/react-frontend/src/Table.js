// Table.js
import React, { useState } from "react";
import "./Table.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const getCategoryTextColor = (category) => {
  switch (category) {
    case "School":
      return "#069B39";
    case "Work":
      return "#06399B";
    case "Other":
      return "#9B062A";
    default:
      return "#000"; // Default color if the category doesn't match any case
  }
};

const getCategoryBackgroundColor = (category) => {
  switch (category) {
    case "School":
      return "#8FF5A6";
    case "Work":
      return "#8FE3F5";
    case "Other":
      return "#F58F9B";
    default:
      return "#FFF"; // Default background color if the category doesn't match any case
  }
};

const filterOptions = ["All", "Work", "School", "Other"];
const priorityOptions = ["None", "High", "Medium", "Low"];
function TableHeader({ setCategoryFilter, setPriorityFilter }) {
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  return (
    <thead>
      <tr>
        <td>
          <label>
            Filter By Category:
            <select
              name="Filter"
              onChange={handleCategoryFilterChange}
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </td>
        <td>
          <label>
            Filter By Priority:
            <select
              name="Priority"
              onChange={handlePriorityFilterChange}
            >
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </td>
      </tr>
    </thead>
  );
}

const convertUTCtoLocal = (utc) => {
  const utcDate = new Date(utc);
  return new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
  );
};

function TableBody(props) {
  const [showCompletePopup, setShowCompletePopup] = useState({
    inUse: false,
    id: ""
  });

  const { categoryFilter, priorityFilter } = props.filters;
  const filteredTasks = props.taskData.filter((row) => {
    // Apply category filter
    if (
      categoryFilter !== "All" &&
      row.category !== categoryFilter
    ) {
      return false;
    }
    // Apply priority filter
    if (
      priorityFilter !== "None" &&
      row.priority !== priorityFilter
    ) {
      return false;
    }
    return true; // Task passes all filters
  });

  const overdueTasks = filteredTasks
    .filter((row) => {
      const dueDate = convertUTCtoLocal(row.due);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      return dueDate < currentDate;
    })
    .map((row, index) => {
      const date = convertUTCtoLocal(row.due);

      return (
        <tr key={index}>
          <Card
            className="custom-card"
            style={{
              width: "18rem",
              border: "1px solid #ced4da",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
          >
            <Card.Body style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: "12px"
                }}
              >
                <Card.Text
                  onClick={() => (
                    (row.status = !row.status),
                    props.updateTask(row)
                  )}
                >
                  {row.status === true ? (
                    <span
                      style={{ textDecoration: "line-through" }}
                    >
                      {row.task}
                    </span>
                  ) : (
                    <span>{row.task}</span>
                  )}
                </Card.Text>
                <TaskAltOutlinedIcon
                  style={{
                    border: "none",
                    padding: "1px", // Adjust padding as needed
                    cursor: "pointer"
                  }}
                  onClick={() =>
                    setShowCompletePopup({
                      inUse: true,
                      id: row._id
                    })
                  }
                ></TaskAltOutlinedIcon>
                {showCompletePopup.inUse &&
                  row._id === showCompletePopup.id && (
                    <div className="popup">
                      <button
                        type="button"
                        onClick={() =>
                          props.removeTask(showCompletePopup.id)
                        }
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCompletePopup({
                            inUse: false,
                            id: ""
                          })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  )}
              </div>
              <Container
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px"
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    borderRadius: "5px",
                    color: getCategoryTextColor(row.category),
                    backgroundColor: getCategoryBackgroundColor(
                      row.category
                    )
                  }}
                >
                  {row.category}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6E7C87",
                    alignSelf: "center"
                  }}
                >
                  {date
                    .toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric"
                    })
                    .toUpperCase()}
                </span>
                <div className={row.priority}>!</div>
              </Container>
            </Card.Body>
          </Card>
        </tr>
      );
    });

  const thisWeekTasks = filteredTasks
    .filter((row) => {
      console.log(row);
      const dueDate = convertUTCtoLocal(row.due);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const weekFromToday = new Date();
      weekFromToday.setHours(0, 0, 0, 0);
      weekFromToday.setDate(weekFromToday.getDate() + 7);

      return (
        (dueDate >= currentDate) & (dueDate < weekFromToday)
      );
    })
    .map((row, index) => {
      const date = convertUTCtoLocal(row.due);

      return (
        <tr key={index}>
          <Card
            className="custom-card"
            style={{
              width: "18rem",
              border: "1px solid #ced4da",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
          >
            <Card.Body style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: "12px"
                }}
              >
                <Card.Text
                  onClick={() => (
                    (row.status = !row.status),
                    props.updateTask(row)
                  )}
                >
                  {row.status === true ? (
                    <span
                      style={{ textDecoration: "line-through" }}
                    >
                      {row.task}
                    </span>
                  ) : (
                    <span>{row.task}</span>
                  )}
                </Card.Text>
                <TaskAltOutlinedIcon
                  style={{
                    border: "none",
                    padding: "1px", // Adjust padding as needed
                    cursor: "pointer"
                  }}
                  onClick={() =>
                    setShowCompletePopup({
                      inUse: true,
                      id: row._id
                    })
                  }
                ></TaskAltOutlinedIcon>
                {showCompletePopup.inUse &&
                  row._id === showCompletePopup.id && (
                    <div className="popup">
                      <button
                        type="button"
                        onClick={() =>
                          props.removeTask(showCompletePopup.id)
                        }
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCompletePopup({
                            inUse: false,
                            id: ""
                          })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  )}
              </div>
              <Container
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px"
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    borderRadius: "5px",
                    color: getCategoryTextColor(row.category),
                    backgroundColor: getCategoryBackgroundColor(
                      row.category
                    )
                  }}
                >
                  {row.category}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6E7C87",
                    alignSelf: "center"
                  }}
                >
                  {date
                    .toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric"
                    })
                    .toUpperCase()}
                </span>
                <div className={row.priority}>!</div>
              </Container>
            </Card.Body>
          </Card>
        </tr>
      );
    });

  const nextWeekTasks = filteredTasks
    .filter((row) => {
      const dueDate = convertUTCtoLocal(row.due);
      const weekFromToday = new Date();
      weekFromToday.setHours(0, 0, 0, 0);
      weekFromToday.setDate(weekFromToday.getDate() + 7);
      return dueDate >= weekFromToday;
    })
    .map((row, index) => {
      const date = convertUTCtoLocal(row.due);

      return (
        <tr key={index}>
          <Card
            className="custom-card"
            style={{
              width: "18rem",
              border: "1px solid #ced4da",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              marginBottom: "10px"
            }}
          >
            <Card.Body style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: "12px"
                }}
              >
                <Card.Text
                  onClick={() => (
                    (row.status = !row.status),
                    props.updateTask(row)
                  )}
                >
                  {row.status === true ? (
                    <span
                      style={{ textDecoration: "line-through" }}
                    >
                      {row.task}
                    </span>
                  ) : (
                    <span>{row.task}</span>
                  )}
                </Card.Text>
                <TaskAltOutlinedIcon
                  style={{
                    border: "none",
                    padding: "1px", // Adjust padding as needed
                    cursor: "pointer"
                  }}
                  onClick={() =>
                    setShowCompletePopup({
                      inUse: true,
                      id: row._id
                    })
                  }
                ></TaskAltOutlinedIcon>
                {showCompletePopup.inUse &&
                  row._id === showCompletePopup.id && (
                    <div className="popup">
                      <button
                        type="button"
                        onClick={() =>
                          props.removeTask(showCompletePopup.id)
                        }
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCompletePopup({
                            inUse: false,
                            id: ""
                          })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  )}
              </div>
              <Container
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px"
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    padding: "5px",
                    borderRadius: "5px",
                    color: getCategoryTextColor(row.category),
                    backgroundColor: getCategoryBackgroundColor(
                      row.category
                    )
                  }}
                >
                  {row.category}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6E7C87",
                    alignSelf: "center"
                  }}
                >
                  {date
                    .toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric"
                    })
                    .toUpperCase()}
                </span>
                <div className={row.priority}>!</div>
              </Container>
            </Card.Body>
          </Card>
        </tr>
      );
    });
  return (
    <tbody>
      <tr>
        <td>
          <b className="label-grey">OVERDUE</b>
          {overdueTasks}
        </td>
        <td>
          <b className="label-grey">THIS WEEK</b>
          {thisWeekTasks}
        </td>
        <td>
          <b className="label-grey">NEXT WEEK</b>
          {nextWeekTasks}
        </td>
      </tr>
    </tbody>
  );
}
function Table(props) {
  const [filters, setFilters] = useState({
    categoryFilter: "All",
    priorityFilter: "None"
  });

  const setCategoryFilter = (value) => {
    setFilters({ ...filters, categoryFilter: value });
  };

  const setPriorityFilter = (value) => {
    setFilters({ ...filters, priorityFilter: value });
  };

  return (
    <table>
      <TableHeader
        setCategoryFilter={setCategoryFilter}
        setPriorityFilter={setPriorityFilter}
      />
      <TableBody
        taskData={props.taskData}
        task2Data={props.task2Data}
        removeTask={props.removeTask}
        updateTask={props.updateTask}
        filters={filters}
      />
    </table>
  );
}

export default Table;
