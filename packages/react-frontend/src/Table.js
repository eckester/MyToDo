import React from "react";
import "./Table.css";

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
        <td>{row.task}</td>
        <td>{row.category}</td>
        <td>
          <div className={row.priority}>!</div>
        </td>
        <td>{date.toDateString()}</td>
        <td>{stat}</td>
        <td>
          <button onClick={() => props.removeTask(row._id)}>
            Delete
          </button>
        </td>
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
