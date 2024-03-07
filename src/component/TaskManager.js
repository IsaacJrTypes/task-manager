import { useState } from 'react';
/*


*/
export function TaskManger() {
    const [tasks, setTasks] = useState([]);
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState('');
    /*
    Implement a function addTask that adds a new task to the tasks array. Use a unique id for each task (e.g., timestamp or an incrementing number), a title provided by the user, and a completed status initialized to false.
    */
    const addTask = () => {
        const task = { id: count, title: title, completed: false };
        setTasks([...tasks, task]);
        setCount(prev => prev + 1);
    };
    const toggleTask = (e) => {
        const toggleId = parseInt(e.target.id);
        // Use spread syntax to only change completed property
        const updatedTasks = tasks.map(task => {
            let obj = task;
            if (task.id === toggleId) {
                obj = { ...task, completed: !task.completed };
            }
            return obj;
        });
        setTasks(updatedTasks);
    };
    const handleInput = (e) => {
        const textInput = e.target.value;
        setTitle(textInput);
    };

    return (
        <>
            <span><input onChange={handleInput}></input><button onClick={addTask}>Add Task</button></span>
            {tasks.map((obj) => {
                return (
                    <li key={obj.id} >
                        <input id={obj.id} type='checkbox' checked={obj.completed} onChange={toggleTask}></input>
                        <pre>{JSON.stringify(obj)}</pre>
                    </li>
                );
            }
            )}
        </>
    );
}