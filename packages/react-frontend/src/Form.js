import React, {useState} from 'react';
function Form(props){
    const[person, setPerson] = useState(
        {
            name: "",
            category: "",
            priority: "",
            date: "",
            status: "",
        }
    );

    const categoryOptions = ['School', 'Work', 'Other'];  
    const priorityOptions = ['Low', 'Medium', 'High'];
 
    function handleChange(event){
        const{name, value} = event.target;
        if (name === "category"){
            setPerson({name: person['name'], category: value, priority: person['priority'],
                date: person['date'], status: person['status']})
        }
        else if (name === "name"){
            setPerson({name: value, category: person['category'], priority: person['priority'],
                date: person['date'], status: person['status']})
        }
        else if (name === "priority"){
            setPerson({name: person['name'], category: person['category'], priority: value,
                date: person['date'], status: person['status']})
        }
        else if (name === "date"){
            setPerson({name: person['name'], category: person['category'], priority: person['priority'],
                date: value, status: person['status']})
        }
        else {
            setPerson({
                name: person['name'], category: person['category'], priority: person['priority'],
                date: person['date'], status: value
            })
        }
    }

    function submitForm(){
        props.handleSubmit(person);
        setPerson({name: '', category: '', priority: '', date: '', status: ''});
    }

    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange} />
            <label htmlFor="category">Category</label>
            <select
                name="category"
                id="category"
                value={person.category}
                onChange={handleChange}
            >
                <option value="">Select a category</option>
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
                value={person.priority}
                onChange={handleChange}
            >
                <option value="">Select a priority</option>
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
                value={person.date}
                onChange={handleChange} />
            <label htmlFor="status">Status</label>
            <input
                type="text"
                name="status"
                id="status"
                value={person.status}
                onChange={handleChange} />
            <input 
                type="button" 
                value="Submit" 
                onClick={submitForm} />
        </form>
    );
}

export default Form;