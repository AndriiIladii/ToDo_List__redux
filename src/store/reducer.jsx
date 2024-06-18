const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return {
        todos: state.todos.concat(action.payload),
      };
    }

    case "TOGGLE_TODO": {
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    }

    case "REMOVE_TODO": {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case "UPDATE_TODOS":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, value: action.payload.value }
            : todo
        ),
      };
    default:
      return state;
  }
};

export default todosReducer;
