import React, { useState } from "react";
import useTodo from "reducers/useTodo";

export default function Todos({ todos: initTodos, cardHandlers, id }) {
  const [todos, todoHandlers] = useTodo(initTodos);
  const updateCardTodos = () => {
    cardHandlers.onChange({
      id,
      field: "todos",
      payload: todos
    });
  };

  return (
    <>
      <TodoForm todoHandlers={todoHandlers} updateCardTodos={updateCardTodos} />
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          todoHandlers={todoHandlers}
          updateCardTodos={updateCardTodos}
        />
      ))}
    </>
  );
}

function TodoForm({ todoHandlers, updateCardTodos }) {
  const [todoInp, setTodoInp] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    todoHandlers.add({ text: todoInp });
    updateCardTodos();
    setTodoInp("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Todo inp:
        <input
          type="text"
          value={todoInp}
          onChange={e => setTodoInp(e.target.value)}
        />
      </label>
      <input type="submit" value="submit" />
    </form>
  );
}

function Todo({ id, text, checked, todoHandlers, updateCardTodos }) {
  const onChange = () => {
    todoHandlers.toggle({ id });
    updateCardTodos();
  };
  return (
    <div key={id}>
      <label>
        <input type="checkbox" key={id} checked={checked} onChange={onChange} />
        {text}
      </label>
    </div>
  );
}