import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo, updateTodos } from "../store/actions";
import * as styles from "./ToDo.module.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState("");
  const [editedId, setEditedId] = useState(null);

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  function handleInput(event) {
    setTodo(event.target.value);
  }

  function handleEdit(event) {
    setTodoEdit(event.target.value);
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
    dispatch(
      removeTodo({
        id,
      })
    );
  }

  function handleCheckbox(id) {
    dispatch(
      toggleTodo({
        id,
      })
    );
  }

  function editTask(todoItem) {
    setTodoEdit(todoItem.value);
    setEditedId(todoItem.id);
  }

  function updateTodo() {
    if (!validateInput(todoEdit)) return;
    dispatch(
      updateTodos({
        id: editedId,
        value: todoEdit,
      })
    );
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
          {todos.map((item) => (
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
