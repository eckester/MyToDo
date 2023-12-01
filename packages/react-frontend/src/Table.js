// Table.js
import React, { useState } from "react";
import "./Table.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const categoryColors = {
  School: { textColor: "#069B39", backgroundColor: "#8FF5A6" },
  Work: { textColor: "#06399B", backgroundColor: "#8FE3F5" },
  Other: { textColor: "#9B062A", backgroundColor: "#F58F9B" },
  default: { textColor: "#000", backgroundColor: "#FFF" }
};

const getCategoryTextColor = (category) =>
  categoryColors[category]?.textColor ||
  categoryColors.default.textColor;
const getCategoryBackgroundColor = (category) =>
  categoryColors[category]?.backgroundColor ||
  categoryColors.default.backgroundColor;

const classesColors = {
  "": { textColor: "#FFF", backgroundColor: "#FFF" },
  CS: { textColor: "#b52602", backgroundColor: "#f59c85" },
  Math: { textColor: "#9c752f", backgroundColor: "#fac66b" },
  English: { textColor: "#ad9640", backgroundColor: "#ffe172" },
  History: { textColor: "#649e48", backgroundColor: "#affc89" },
  Chemistry: {
    textColor: "#407185",
    backgroundColor: "#82d8fa"
  },
  "CSC-307": {
    textColor: "#7042ad",
    backgroundColor: "#d2b6f7"
  },
  default: { textColor: "#FFF", backgroundColor: "#FFF" }
};

const getClassesTextColor = (classes) =>
  classesColors[classes]?.textColor ||
  classesColors.default.textColor;
const getClassesBackgroundColor = (classes) =>
  classesColors[classes]?.backgroundColor ||
  classesColors.default.backgroundColor;

const convertUTCtoLocal = (utc) => {
  const utcDate = new Date(utc);
  return new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
  );
};

const priorityOptions = ["None", "High", "Medium", "Low"];

function TableHeader({ setPriorityFilter }) {
  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  return (
    <thead>
      <tr>
        <label style={{ paddingLeft: "7px" }}>
          Filter By Priority:
          <select
            name="Priority"
            onChange={handlePriorityFilterChange}
            style={{ width: "300px", paddingLeft: "7px" }}
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const [showCompletePopup, setShowCompletePopup] = useState({
    inUse: false,
    id: ""
  });

  const { priorityFilter } = props.filters;

  const filteredTasks = props.taskData.filter((row) => {
    // Apply priority filter
    if (
      priorityFilter !== "None" &&
      row.priority !== priorityFilter
    ) {
      return false;
    }
    return true; // Task passes all filters
  });

  const generateTableRow = (tasks) =>
    tasks.map((row, index) => {
      const date = convertUTCtoLocal(row.due);
      return (
        <tr key={index}>
          <Card className="custom-card">
            <Card.Body
              style={{ padding: "10px", position: "relative" }}
            >
              <div className="card-container">
                <Card.Text
                  className="task-title"
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
                  className="card-icon"
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
              <div className="centered-content">
                <Container className="card-container">
                  <div className={row.priority}>!</div>
                  <span
                    className="card-span"
                    style={{
                      color: getCategoryTextColor(row.category),
                      backgroundColor:
                        getCategoryBackgroundColor(row.category)
                    }}
                  >
                    {row.category}
                  </span>
                  <span
                    className="card-span"
                    style={{
                      color: getClassesTextColor(row.class),
                      backgroundColor:
                        getClassesBackgroundColor(row.class)
                    }}
                  >
                    {row.class}
                  </span>
                  <span className="card-date">
                    {date
                      .toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric"
                      })
                      .toUpperCase()}
                  </span>
                </Container>
              </div>
            </Card.Body>
          </Card>
        </tr>
      );
    });

  const overdueTasks = generateTableRow(
    filteredTasks.filter(
      (row) =>
        convertUTCtoLocal(row.due) <
        new Date().setHours(0, 0, 0, 0)
    ),
    "OVERDUE"
  );

  const thisWeekTasks = generateTableRow(
    filteredTasks.filter((row) => {
      const dueDate = convertUTCtoLocal(row.due);
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const weekFromToday = new Date(currentDate);
      weekFromToday.setDate(weekFromToday.getDate() + 7);
      return dueDate >= currentDate && dueDate < weekFromToday;
    }),
    "THIS WEEK"
  );

  const nextWeekTasks = generateTableRow(
    filteredTasks.filter((row) => {
      const dueDate = convertUTCtoLocal(row.due);
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const weekFromToday = new Date(currentDate);
      weekFromToday.setDate(weekFromToday.getDate() + 7);
      return dueDate >= weekFromToday;
    }),
    "NEXT WEEK"
  );

  return (
    <tbody>
      <tr>
        <td>
          <b className="label-dates">OVERDUE</b>
          {overdueTasks}
        </td>
        <td>
          <b className="label-dates">THIS WEEK</b>
          {thisWeekTasks}
        </td>
        <td>
          <b className="label-dates">NEXT WEEK</b>
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

  const setPriorityFilter = (value) => {
    setFilters({ ...filters, priorityFilter: value });
  };

  return (
    <table>
      <TableHeader setPriorityFilter={setPriorityFilter} />
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
