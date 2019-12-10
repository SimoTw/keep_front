import React, { useState } from "react";
import useTodo from "reducers/useTodo";
import styles from "./Todos.module.css";
import TextArea from "components/TextArea";
import Button from "components/Button";
import { ReactComponent as CheckedCheckBox } from "statics/svgs/check_box_outline_blank.svg";
import { ReactComponent as CheckBox } from "statics/svgs/check_box.svg";
import { ReactComponent as Close } from "statics/svgs/close.svg";
import Input from "components/Input";

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
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          todoHandlers={todoHandlers}
          updateCardTodos={updateCardTodos}
        />
      ))}
      <TodoForm todoHandlers={todoHandlers} updateCardTodos={updateCardTodos} />
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
    <form className={styles.todoList} onSubmit={handleSubmit}>
      {todoInp === "" ? (
        <Input
          className={styles.input}
          type="text"
          placeholder="add todo"
          value={todoInp}
          onChange={e => setTodoInp(e.target.value)}
        />
      ) : (
        <Todo
          className={styles.input}
          type="text"
          placeholder="add todo"
          value={todoInp}
          onChange={e => setTodoInp(e.target.value)}
        />
      )}
    </form>
  );
}

function Todo({ id, text, checked, todoHandlers, updateCardTodos }) {
  const onChange = () => {
    todoHandlers.toggle({ id });
    updateCardTodos();
  };
  return (
    <div key={id} className={styles.todoList}>
      <Button
        className={styles.todoCheckbox}
        type="checkbox"
        key={id}
        checked={checked}
        onClick={onChange}
      >
        {checked ? <CheckedCheckBox /> : <CheckBox />}
      </Button>
      <TextArea className={styles.todoTextArea} value={text} />
      <Button key={id} onClick={() => todoHandlers.remove({ id })}>
        <Close />
      </Button>{" "}
    </div>
  );
}
