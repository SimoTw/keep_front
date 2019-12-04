import { useReducer } from "react";

let todoId = 0;
function makeTodo({ text }) {
  return {
    id: todoId++,
    text,
    checked: false
  };
}

const todoReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const { text } = action;
      return [...state, makeTodo({ text })];
    }
    case "remove": {
      const { id } = action;
      return state.filter(todo => todo.id !== id);
    }
    case "toggle": {
      const { id } = action;
      return state.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      );
    }
    default:
      throw new Error(`Unhandlable type ${action.type}`);
  }
};

todoReducer.types = {
  add: "add",
  remove: "remove",
  toggle: "toggle"
};

export default function useTodo(initState = []) {
  const [state, dispatch] = useReducer(todoReducer, initState);
  const add = ({ text }) => dispatch({ type: todoReducer.types.add, text });
  const remove = ({ id }) => dispatch({ type: todoReducer.types.remove, id });
  const toggle = ({ id }) => dispatch({ type: todoReducer.types.toggle, id });
  return [state, { add, remove, toggle }];
}
