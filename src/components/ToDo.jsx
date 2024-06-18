import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../store/actions";
import * as styles from "./ToDo.module.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState("");
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("newTask")) || []
  );
  const [editedId, setEditedId] = useState(null);

  useEffect(() => {
    localStorage.setItem("newTask", JSON.stringify(task));
  }, [task]);

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  function handleInput(event) {
    setTodo(event.target.value);
  }

  function handleEdit(event) {
    setTodoEdit(event.target.value);
  }

  function handleCheckbox(id) {
    let toggle = task.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTask(toggle);
  }

  function validateInput(input) {
    if (input === "") {
      alert("You must Enter Your task");
      return false;
    }
    return true;
  }

  function addTask() {
    if (!validateInput(todo)) return;
    dispatch(
      addTodo({
        id: Date.now(),
        value: todo,
        completed: false,
      })
    );
    setTodo("");
  }

  function deleteTask(id) {
    const updateTask = task.filter((item) => item.id !== id);
    setTask(updateTask);
  }

  function editTask(todoItem) {
    setTodoEdit(todoItem.value);
    setEditedId(todoItem.id);
  }

  function updateTodo() {
    if (!validateInput(todoEdit)) return;

    let updatedTodos = task.map((item) => {
      if (item.id === editedId) {
        item.value = todoEdit;
      }
      return item;
    });
    setTask(updatedTodos);
    setEditedId(null);
    setTodoEdit("");
  }

  function cancelEditing() {
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
              {editedId === item.id ? (
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
                  <p className={item.completed ? styles.completed : "none"}>
                    {item.value}
                  </p>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckbox(item.id)}
                  />
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
