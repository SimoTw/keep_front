import { useReducer, useEffect } from "react";
import getNextId from "helpers/getNextId";
import useFetchedTodos from "api/useFetchedTodos";

function makeTodo({ content, allIds, cardId }) {
  const id = getNextId(allIds);
  return {
    id,
    content,
    checked: false,
    cardId
  };
}

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

export default function useTodo() {
  const [state, dispatch] = useReducer(todoReducer, {
    byId: {},
    allIds: []
  });
  //reset state while get fetch todos
  const [fetchedTodos, fetchTodoHanlers] = useFetchedTodos();
  useEffect(() => {
    console.log("useEffect", { fetchedTodos });
    const makeById = fetchedTodos => {
      const byId = {};
      fetchedTodos.forEach(todo => {
        byId[todo.id] = todo;
        return todo;
      });
      return byId;
    };
    dispatch({
      type: "setTodos",
      todos: {
        byId: makeById(fetchedTodos),
        allIds: fetchedTodos.map(todo => todo.id)
      }
    });
  }, [fetchedTodos]);

  const add = (content, cardId) => {
    const todo = makeTodo({ content, allIds: state.allIds, cardId });
    console.log({ todo });
    dispatch({ type: todoReducer.types.add, todo });
    fetchTodoHanlers.add(todo);
  };
  const remove = id => {
    dispatch({ type: todoReducer.types.remove, id });
    fetchTodoHanlers.remove(id);
  };
  const toggle = id => {
    const payload = !state.byId[id].checked;
    dispatch({
      type: "change",
      id,
      field: "checked",
      payload
    });
    fetchTodoHanlers.update(id, { checked: payload });
  };

  const onChange = (id, payload) => {
    dispatch({ type: "change", id, field: "content", payload });
    fetchTodoHanlers.update(id, { content: payload });
  };
  return [state, { add, remove, toggle, onChange }];
}
