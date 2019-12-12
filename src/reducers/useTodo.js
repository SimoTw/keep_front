import { useReducer } from "react";
import getNextId from "helpers/getNextId";

function makeTodo({ text, todos }) {
  return {
    id: getNextId(todos),
    text,
    checked: false
  };
}

const todoReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const { text } = action;
      return [...state, makeTodo({ text, todos: state })];
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
    case "change": {
      const { id, text } = action;
      return state.map(todo => (todo.id === id ? { ...todo, text } : todo));
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
  const makeOnChange = id => e =>
    dispatch({ type: "change", id, text: e.target.value });
  return [state, { add, remove, toggle, makeOnChange }];
}
