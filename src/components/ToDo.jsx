import React, { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [task, setTask] = useState([]);

  function handleInput(event) {
    setTodo(event.target.value);
  }

  function addTask() {
    if (todo.trim() !== "") {
      const newTask = {
        id: Date.now(),
        value: todo,
        status: false,
      };
      const updateTasks = [...task, newTask];
      setTask(updateTasks);
    }
  }

  function deleteTask(id) {
    const updateTask = task.filter((item) => item.id !== id);
    setTask(updateTask);
  }

  return (
    <div>
      <input
        type="text"
        value={todo}
        placeholder="Add task..."
        onChange={handleInput}
      />
      <button onClick={addTask}>Add</button>
      <div>
        <ol>
          {task.map((item) => (
            <li key={item.id}>
              <p>{item.value}</p>

              <button onClick={() => deleteTask(item.id)}>DeleteTask</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
