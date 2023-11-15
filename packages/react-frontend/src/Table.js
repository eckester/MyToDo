import React from "react";
import "./Table.css";
import Card from "react-bootstrap/Card";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Priority</th>
        <th>Due Date</th>
        <th>Status</th>
      </tr>
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
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <Card.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Arrange children vertically
                alignItems: "start" // Align children to the start of the container
              }}
            >
              <Card.Text>{row.task}</Card.Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <button
                  onClick={() => props.removeTask(row._id)}
                >
                  <CheckBoxRoundedIcon />
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <td>{row.category}</td>
        <td>
          <div className={row.priority}>!</div>
        </td>
        <td>{date.toDateString()}</td>
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
