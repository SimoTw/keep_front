import React, { useMemo, useEffect } from "react";
import styles from "./Todos.module.css";
import Button from "components/Button/Button";
import CheckBox from "components/CheckBox/CheckBox";
import { ReactComponent as Close } from "statics/svgs/close.svg";
import { ReactComponent as Add } from "statics/svgs/add.svg";
import useTodo from "useReducers/useTodo";
import Input from "components/Input/Input";

// import Input from "components/Input";

export default function Todos({ cardId }) {
  const [todos, todoHandlers] = useTodo(cardId);
  const renderTodos = useMemo(
    () =>
      todos.map(todo => (
        <Todo key={todo.id} {...todo} todoHandlers={todoHandlers} />
      )),
    [todos, todoHandlers]
  );
  return (
    <>
      {renderTodos}
      <AddTodo cardId={cardId} todoHandlers={todoHandlers} />
    </>
  );
}

function AddTodo({ cardId, todoHandlers }) {
  const [inp, setInp] = React.useState("");
  // const todoHandlers = useContext(TodoHandlerContext);

  const onClick = () => {
    // add todo
    todoHandlers.add(inp, cardId);
    setInp("");
  };
  return (
    <form className={styles.todoList} onSubmit={onClick}>
      <Button onClick={onClick}>
        <Add />
      </Button>
      <Input
        className={styles.todoTextArea}
        value={inp}
        placeholder="add Todo"
        onChange={e => setInp(e.target.value)}
      />
    </form>
  );
}

function Todo({ id, content, checked, todoHandlers }) {
  // const todoHandlers = useContext(TodoHandlerContext);

  const textRef = React.useRef(null);
  useEffect(() => {
    textRef.current.value = content;
  }, [content]);

  const onToggle = () => {
    todoHandlers.toggle(id);
  };
  const onSubmit = e => {
    e.preventDefault();
    const { value } = textRef.current;
    todoHandlers.onChange(id, value);
    textRef.current.blur();
  };
  const onRemoveClick = () => {
    todoHandlers.remove(id);
  };
  return (
    <form className={styles.todoList} onSubmit={onSubmit}>
      <CheckBox
        className={styles.todoCheckbox}
        type="checkbox"
        checked={checked}
        onClick={onToggle}
      />

      <Input className={styles.todoTextArea} ref={textRef} />
      <Button onClick={onRemoveClick}>
        <Close />
      </Button>
    </form>
  );
}
