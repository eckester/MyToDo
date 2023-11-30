// MyCalendar.js
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css";

const localizer = momentLocalizer(moment);

const formatDate = (tasks) => {
  return tasks.map((task) => ({
    ...task,
    due: moment.utc(task.due).format("MM/DD/YY")
  }));
};

const MyCalendar = ({ tasks }) => {
  const formattedTasks = formatDate(tasks);

  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(undefined);
  };

  const Modal = ({ selectedEvent, closeModal }) => {
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content">
          <button
            className="modal-exit-button"
            onClick={closeModal}
          >
            X
          </button>
          <div className="modal-header">
            <h2 className="modal-title">
              {selectedEvent.task}
            </h2>
          </div>
          <div className="modal-details">
            <p> Date: {selectedEvent.due}</p>
            {selectedEvent.category && (
              <p className="details-row">
                Category: {selectedEvent.category}
                {selectedEvent.class && ( // Check if class exists
                  <span style={{ float: "right" }}>
                    Class: {selectedEvent.class}
                  </span>
                )}
              </p>
            )}
            <p>Priority: {selectedEvent.priority}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      {showModal && (
        <Modal
          selectedEvent={selectedEvent}
          closeModal={closeModal}
        />
      )}
      <Calendar
        popup={true}
        defaultDate={new Date()}
        localizer={localizer}
        events={formattedTasks}
        startAccessor="due"
        endAccessor="due"
        titleAccessor="task"
        views={["month"]}
        style={{ height: "100vh" }}
        selected={selectedEvent}
        onSelectEvent={(e) => handleSelectedEvent(e)}
      />
    </div>
  );
};

export default MyCalendar;
