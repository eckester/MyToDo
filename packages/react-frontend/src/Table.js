import React from "react";
import "./Table.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

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
  "Due Date",
  "Class",
  "Category",
  "Priority"
];
function TableHeader() {
  return (
    <thead>
      <select name="Filter">
        <option value="">Filter By</option>
        {filterOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.taskData.map((row, index) => {
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
              <button
                style={{
                  border: "none",
                  padding: "1px", // Adjust padding as needed
                  cursor: "pointer"
                }}
                onClick={() => props.removeTask(row._id)}
              >
                <CheckBoxRoundedIcon />
              </button>
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
  return <tbody>{rows}</tbody>;
}
function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        taskData={props.taskData}
        removeTask={props.removeTask}
      />
    </table>
  );
}

export default Table;
