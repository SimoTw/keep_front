import React, { useContext } from "react";
import styles from "./Todos.module.css";
import TextArea from "components/TextArea";
import Button from "components/Button";
import CheckBox from "components/CheckBox";
import { ReactComponent as Close } from "statics/svgs/close.svg";
import { ReactComponent as Add } from "statics/svgs/add.svg";
import { TodosByIdContext, TodoHandlerContext } from "App";

// import Input from "components/Input";

export default function Todos({ todos: allIds, cardId }) {
  // const [todos, todoHandlers] = useTodo(id);
  const byId = useContext(TodosByIdContext);
  console.log({ allIds, byId, cardId });

  return (
    <>
      {allIds.map(id => {
        const todo = byId[id];
        return <Todo key={todo.id} {...todo} />;
      })}
      <AddTodo cardId={cardId} />
    </>
  );
}

function AddTodo({ cardId }) {
  const [inp, setInp] = React.useState("");
  const todoHandlers = useContext(TodoHandlerContext);

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

function Todo({ id, text, checked }) {
  const todoHandlers = useContext(TodoHandlerContext);
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
        onChange={onToggle}
      />

      <TextArea
        className={styles.todoTextArea}
        value={text}
        onChange={onTextChange}
      />
      <Button onClick={onRemoveClick}>
        <Close />
      </Button>
    </div>
  );
}
