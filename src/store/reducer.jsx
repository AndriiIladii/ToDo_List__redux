const initialState = JSON.parse(localStorage.getItem("newTask")) || [];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newState = state.concat(action.payload);
      return newState;
    }
    case "TOGGLE_TODO": {
      const { index } = action.payload;
      const newState = state.map((todo, i) => {
        if (i !== index) return todo;
        return {
          ...todo,
          completed: !todo.completed,
        };
      });

      return newState;
    }
    case "REMOVE_TODO": {
      const newState = state.filter((todo, i) => i !== action.payload.index);
      return newState;
    }
    default:
      return state;
  }
};

export default todosReducer;
