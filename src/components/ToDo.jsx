import React, { useState, useRef } from "react";

import * as styles from "./ToDo.module.css";

const App = () => {
  const inputRef = useRef();
  const [tasks, setTask] = useState([]);

  function addTask() {
    if (inputRef.current.value !== "") {
      setTask([...tasks, inputRef.current.value]);
    }
  }

  function deleteTask(task) {
    const updateTask = tasks.filter((_, index) => index !== task);
    setTask(updateTask);
  }

  return (
    <div>
      <input type="text" defaultValue="Enter Task" ref={inputRef} />
      <button onClick={addTask}>Add Task</button>
      <ol>
        {tasks.map((item, index) => (
          <li key={index}>
            <p>{item}</p>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
