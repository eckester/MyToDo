// MyCalendar.js
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css";

const localizer = momentLocalizer(moment);

const formatDate = (tasks) => {
  console.log(tasks[0].due);
  return tasks.map((task) => ({
    ...task,
    due: moment.utc(task.due).format("MM/DD/YY")
  }));
};

const MyCalendar = ({ tasks }) => {
  console.log(tasks);

  const formattedTasks = formatDate(tasks);

  const views = {
    month: true // Display only the month view
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={formattedTasks}
        startAccessor="due"
        endAccessor="due"
        titleAccessor="task"
        views={views}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default MyCalendar;
