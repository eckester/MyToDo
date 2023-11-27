// MyCalendar.js
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ tasks }) => {
  console.log(tasks);
  const views = {
    month: true // Display only the month view
  };
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={tasks}
        startAccessor="due"
        endAccessor="due"
        views={views}
      />
    </div>
  );
};

export default MyCalendar;
