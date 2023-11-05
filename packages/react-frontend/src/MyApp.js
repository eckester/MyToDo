import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from './Form';
import Header from "./header";
  
function MyApp() {
    const [tasks, setTasks] = useState([]);
    
    function fetchTasks(){
        const promise = fetch("http://localhost:8000/tasks");
        return promise;
    }
    useEffect(() => {
        fetchTasks()
            .then((res) => res.json())
            .then((json) => setTasks(json["toDoList"]))
            .catch((error) => {console.log(error)});

    }, [] );

    function removeOneTask(id) {
        const updated = tasks.filter((task) => task._id !== id);
        setTasks(updated);
        fetch(`http://localhost:8000/tasks/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.status === 204) {
                const updated = tasks.filter((task) => task.id !== id);
                setTasks(updated);
            } else if (response.status === 404) {
                console.log('Task not found');
            } else {
                console.log('Failed to delete with status code: ', response.status);
            }
        })
        .catch((error) => {
            console.log('Error while deleting: ', error);
        });
   
    }

    function updateList(task) {
        setTasks([...tasks, task]);
        postTask(task)
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                console.log('Task insertion failed with status code:',response.status);

            }
        })
        .then((newTask) => {
            if (newTask) {
                setTasks([...tasks, newTask]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function postTask(task) {
        const promise = fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        return promise;
    }

    

    return (

    <div className="container">
        <Header />
        <Table taskData={tasks}
                removeTask = {removeOneTask}/>
        <Form handleSubmit={updateList}/>
    </div>
    );
}
    

export default MyApp;