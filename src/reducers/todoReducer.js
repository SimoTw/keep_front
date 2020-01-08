const todoReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const { todo } = action;
      return {
        byId: { ...state.byId, [todo.id]: todo },
        allIds: [...state.allIds, todo.id]
      };
    }
    case "remove": {
      const { id } = action;
      const nextById = { ...state.byId };
      delete nextById[id];
      return {
        byId: nextById,
        allIds: state.allIds.filter(todoId => todoId !== id)
      };
    }

    case "change": {
      // const { id, text } = action;
      const { id, field, payload } = action;
      return {
        ...state,
        byId: { ...state.byId, [id]: { ...state.byId[id], [field]: payload } }
      };
      // return state.map(todo => (todo.id === id ? { ...todo, text } : todo));
    }
    case "setTodos": {
      const { todos } = action;
      //   const makeById = todos => {
      //     const byId = {};
      //     todos.forEach(todo => {
      //       byId[todo.id] = todo;
      //       return todo;
      //     });
      //     return byId;
      //   };
      //   const byId = makeById(todos);
      //   return {
      //     byId,
      //     allIds: todos.map(todo => todo.id)
      //   };
      return todos;
    }
    default:
      throw new Error(`Unhandlable type ${action.type}`);
  }
};

todoReducer.types = {
  add: "add",
  remove: "remove",
  change: "change",
  setTodos: "setTodos"
};

export default todoReducer;
