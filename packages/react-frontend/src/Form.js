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
                type="text"
                name="category"
                id="category"
                onChange={handleChange}>
                <option value="other">---Choose Category---</option>
                <option value="school">School</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
            </select>
            <label htmlFor="priority">Priority</label>
            <select
                type="text"
                name="priority"
                id="priority"
                onChange={handleChange}>
                <option value="none">---Choose Priority---</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="none">None</option>
            </select>
            <label htmlFor="date">Due Date</label>
            <input
                type="text"
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