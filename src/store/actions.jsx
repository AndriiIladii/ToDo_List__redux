export const addTodo = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const toggleTodo = (index) => ({
  type: "TOGGLE_TODO",
  payload: index,
});

export const removeTodo = (id) => ({
  type: "REMOVE_TODO",
  payload: id,
});

export const updateTodos = (id, value) => ({
  type: "UPDATE_TODO",
  payload: { id, value },
});
