import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Form.css";

function Form(props) {
  const [tasks, setTask] = useState({
    task: "",
    category: "",
    priority: 0,
    due: Date.now,
    status: "",
    _id: "",
    class: "",
    user: props.name
  });

  const categoryOptions = ["School", "Work", "Other"];
  const priorityOptions = ["Low", "Medium", "High", "None"];

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "category") {
      setTask({
        task: tasks["task"],
        category: value,
        priority: tasks["priority"],
        due: tasks["due"],
        class: tasks["class"],
        user: tasks["user"]
      });
    } else if (name === "name") {
      setTask({
        task: value,
        category: tasks["category"],
        priority: tasks["priority"],
        due: tasks["due"],
        class: tasks["class"],
        user: tasks["user"]
      });
    } else if (name === "priority") {
      setTask({
        task: tasks["task"],
        category: tasks["category"],
        priority: value,
        due: tasks["due"],
        class: tasks["class"],
        user: tasks["user"]
      });
    } else if (name === "date") {
      setTask({
        task: tasks["task"],
        category: tasks["category"],
        priority: tasks["priority"],
        due: value,
        class: tasks["class"],
        user: tasks["user"]
      });
    } else if (name === "class") {
      setTask({
        task: tasks["task"],
        category: tasks["category"],
        priority: tasks["priority"],
        due: tasks["class"],
        class: value,
        user: tasks["user"]
      });
    } else {
      setTask({
        task: tasks["task"],
        category: tasks["category"],
        priority: tasks["priority"],
        due: tasks["due"],
        class: tasks["class"],
        user: tasks["user"]
      });
    }
  }

  function submitForm() {
    props.handleSubmit(tasks);
    setTask({
      task: "",
      category: "",
      priority: "",
      due: Date.now,
      status: false,
      class: "",
      user: props.name
    });
    setShow(false); // close the popup after submitting
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="task-button"
        onClick={handleShow}
      >
        Add Task
      </Button>
      <Modal
        centered
        size="lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Title>Adding Task</Modal.Title>
        <Modal.Body>
          <form>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={tasks.task}
              onChange={handleChange}
            />
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={tasks.category}
              onChange={handleChange}
            >
              <option value="">---Choose Category---</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="class"
              id="class"
              value={tasks.class}
              onChange={handleChange}
            />
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              value={tasks.priority}
              onChange={handleChange}
            >
              <option value="">---Choose Priority---</option>
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="date">Due Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={tasks.due}
              onChange={handleChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button vairant="primary" onClick={submitForm}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Form;
