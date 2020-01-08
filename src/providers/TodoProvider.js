import React, { useEffect } from "react";
import todoReducer from "reducers/todoReducer";
import TodoContext from "contexts/TodoContext";
import useGet from "api/helpers/useGet";
import { baseURL } from "api/helpers/baseURL";

export default function TodoProvider({ children }) {
  const [state, dispatch] = React.useReducer(todoReducer, {
    byId: {},
    allIds: []
  });
  const { results } = useGet(`${baseURL}/todos/`);
  useEffect(() => {
    const makeById = fetchedTodos => {
      const byId = {};
      fetchedTodos.forEach(todo => {
        byId[todo.id] = { ...todo };
        return todo;
      });
      return byId;
    };
    dispatch({
      type: todoReducer.types.setTodos,
      todos: {
        byId: makeById(results),
        allIds: results.map(todo => todo.id)
      }
    });
  }, [results]);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
