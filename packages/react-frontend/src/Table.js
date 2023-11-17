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

const filterOptions = [
  "All",
  "Work",
  "School",
  "Other",
  "Priority"
];
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
      <div>
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
        <label>
          Filter By Priority:
          <select
            name="Priority"
            onChange={handlePriorityFilterChange}
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </thead>
  );
}

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
      priorityFilter !== "none" &&
      row.priority !== priorityFilter
    ) {
      return false;
    }

    return true; // Task passes all filters
  });
  const rows = filteredTasks.map((row, index) => {
    let stat = "In-Progress";
    if (row.status) {
      stat = "Complete";
    }
    const date = new Date(row.due);
    return (
      <tr key={index}>
        <Card
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
              <Card.Text>{row.task}</Card.Text>
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
                {new Date(date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric"
                })}
              </span>
              <div className={row.priority}>!</div>
            </Container>
          </Card.Body>
        </Card>
        <td>{stat}</td>
      </tr>
    );
  });
  const rows2 = filteredTasks.map((row, index) => {
    let stat = "In-Progress";
    if (row.status) {
      stat = "Complete";
    }
    const date = new Date(row.due);
    return (
      <tr key={index}>
        <Card
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
              <Card.Text>{row.task}</Card.Text>
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
                {new Date(date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric"
                })}
              </span>
              <div className={row.priority}>!</div>
            </Container>
          </Card.Body>
        </Card>
        <td>{stat}</td>
      </tr>
    );
  });
  return (
    <tbody>
      <tr>
        <td>
          <b>~Overdue</b>
          {rows}
        </td>
        <text>{"\n"}</text>
        <td>
          <b>~This Week</b>
          {rows2}
        </td>
        <text>{"\n"}</text>
        <td>
          <b>~Next Week</b>
          {rows}
        </td>
      </tr>
    </tbody>
  );
}
function Table(props) {
  const [filters, setFilters] = useState({
    categoryFilter: "All",
    priorityFilter: "none"
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
        filters={filters}
      />
    </table>
  );
}

export default Table;
