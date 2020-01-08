import { useContext } from "react";
import todoReducer from "reducers/todoReducer";
import getNextId from "helpers/getNextId";
import useTodoMutation from "api/useTodoMutation";
import TodoContext from "contexts/TodoContext";

function makeTodo({ content, allIds, cardId }) {
  const id = getNextId(allIds);
  return {
    id,
    content,
    checked: false,
    cardId
  };
}

export default function useTodo(cardId) {
  if (!cardId) {
    throw new Error(`CardId is required for useTodo`);
  }
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(`useTodo must be used within a TodoProvider`);
  }
  const [state, dispatch] = context;
  //reset state while get fetch todos
  const [fetchTodoHanlers] = useTodoMutation();

  const add = (content, cardId) => {
    const todo = makeTodo({ content, allIds: state.allIds, cardId });
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
  const todos = state.allIds
    .map(id => state.byId[id])
    .filter(todo => todo.cardId === cardId);
  return [todos, { add, remove, toggle, onChange }];
}
