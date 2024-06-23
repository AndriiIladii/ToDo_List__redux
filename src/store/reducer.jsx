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

    case "UPDATE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, value: action.payload.value }
            : todo
        ),
      };

    case "SAVE_TODOS": {
      localStorage.setItem("todos", JSON.stringify(action.payload));
    }

    default:
      return state;
  }
};

export default todosReducer;
