import React, { useState } from "react";
function Form(props) {
  //let date = Date.now();
  //let str = date.toDateString();
  const [tasks, setTask] = useState({
    task: "",
    category: "",
    priority: "",
    due: "",
    status: "",
    _id: ""
  });

  const [showPopup, setShowPopup] = useState(false);

  const categoryOptions = ["School", "Work", "Other"];
  const priorityOptions = ["Low", "Medium", "High", "None"];
  //const statusOptions = ['In-Progress', 'Complete'];

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "category") {
      setTask({
        task: tasks["task"],
        category: value,
        priority: tasks["priority"],
        due: tasks["due"]
      });
    } else if (name === "name") {
      setTask({
        task: value,
        category: tasks["category"],
        priority: tasks["priority"],
        due: tasks["due"]
      });
    } else if (name === "priority") {
      setTask({
        task: tasks["task"],
        category: tasks["category"],
        priority: value,
        due: tasks["due"]
      });
    } else if (name === "date") {
      setTask({
        task: tasks["task"],
        category: tasks["category"],
        priority: tasks["priority"],
        due: value
      });
    } else {
      setTask({
        task: tasks["task"],
        category: tasks["category"],
        priority: tasks["priority"],
        due: tasks["due"]
      });
    }
  }

  function submitForm() {
    props.handleSubmit(tasks);
    setTask({
      task: "",
      category: tasks["category"],
      priority: tasks["priority"],
      due: tasks["due"],
      status: false
    });
    setShowPopup(false); // close the popup after submitting
  }

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>
        Add Task
      </button>{" "}
      {/* Add Task button */}
      {showPopup && (
        <div className="popup">
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
            <button type="button" onClick={submitForm}>
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Form;
