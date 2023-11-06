import React, {useState} from 'react';
function Form(props){
    const[tasks, setTask] = useState(
        {
            task: "",
            category: "",
            priority: "",
            due: "",
            status: "",
            _id: "",
        }
    );

    const categoryOptions = ['School', 'Work', 'Other'];  
    const priorityOptions = ['Low', 'Medium', 'High', 'None'];
    const statusOptions = ['Not started', 'In progress', 'Completed']
 
    function handleChange(event){
        const{name, value} = event.target;
        if (name === "category"){
            setTask({task: tasks['task'], category: value,
                priority: tasks['priority'], due: tasks['due']})
        }
        else if (name === "name"){
            setTask({task: value, category: tasks['category'],
                priority: tasks['priority'], due: tasks['due']})
        }
        else if (name === "priority"){
            setTask({task: tasks['task'], category: tasks['category'],
                priority: value, due: tasks['due']})
        }
        else if (name === "date"){
            setTask({task: tasks['task'], category: tasks['category'],
                priority: tasks['priority'], due: value})
        }
        else {
            setTask({
                task: tasks['task'], category: tasks['category'],
                priority: tasks['priority'], due: tasks['due']
            })
        }
    }

    function submitForm(){
        props.handleSubmit(tasks);
        setTask({task: '', category: tasks['category'], priority: tasks['priority'], due: '', status: '', _id: ''});
    }

    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={tasks.task}
                onChange={handleChange} />
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
                onChange={handleChange} />
            <input 
                type="button" 
                value="Submit" 
                onClick= {submitForm} />
        </form>
    );
}

export default Form;