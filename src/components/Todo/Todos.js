import React, { useMemo } from "react";
import styles from "./Todos.module.css";
import TextArea from "components/TextArea/TextArea";
import Button from "components/Button/Button";
import CheckBox from "components/CheckBox/CheckBox";
import { ReactComponent as Close } from "statics/svgs/close.svg";
import { ReactComponent as Add } from "statics/svgs/add.svg";
import useTodo from "useReducers/useTodo";

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
      <TextArea
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
  const onToggle = () => {
    todoHandlers.toggle(id);
  };
  const onTextChange = e => {
    const { value } = e.target;
    todoHandlers.onChange(id, value);
  };
  const onRemoveClick = () => {
    todoHandlers.remove(id);
  };
  return (
    <div className={styles.todoList}>
      <CheckBox
        className={styles.todoCheckbox}
        type="checkbox"
        checked={checked}
        onClick={onToggle}
      />

      <TextArea
        className={styles.todoTextArea}
        value={content}
        onChange={onTextChange}
      />
      <Button onClick={onRemoveClick}>
        <Close />
      </Button>
    </div>
  );
}
