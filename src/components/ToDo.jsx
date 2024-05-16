import React, { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState("");
  const [task, setTask] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedId, setEditedId] = useState(null);

  function handleInput(event) {
    setTodo(event.target.value);
  }

  function handleEdit(event) {
    setTodoEdit(event.target.value);
  }

  function addTask() {
    if (todo === "") {
      alert("You must Enter Your task");
    } else {
      const newTask = {
        id: Date.now(),
        value: todo,
        completed: false,
      };
      const updateTasks = [...task, newTask];
      setTask(updateTasks);
      setTodo("");
    }
  }

  function deleteTask(id) {
    const updateTask = task.filter((item) => item.id !== id);
    setTask(updateTask);
  }

  function editTask(todoItem) {
    setEdit(true);
    setTodoEdit(todoItem.value);
    setEditedId(todoItem.id);
  }

  function updateTodo() {
    let updatedTodos = task.map((item) => {
      if (item.id === editedId) {
        item.value = todoEdit;
      }
      return item;
    });
    setTask([...updatedTodos]);
    setEditedId(null);
    setEdit(false);
  }

  function cancelEditing() {
    setEdit(false);
    setTodoEdit("");
    setEditedId(null);
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
              {editedId !== null ? (
                <>
                  <input
                    type="text"
                    value={todoEdit}
                    placeholder="Edit task..."
                    onChange={handleEdit}
                  />
                  <button onClick={updateTodo}>Save new</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{item.value}</p>

                  <button onClick={() => deleteTask(item.id)}>
                    Delete Task
                  </button>
                  <button onClick={() => editTask(item)}>Update Task</button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
