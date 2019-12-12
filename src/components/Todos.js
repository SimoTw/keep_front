import React from "react";
import useTodo from "reducers/useTodo";
import styles from "./Todos.module.css";
import TextArea from "components/TextArea";
import Button from "components/Button";
import CheckBox from "components/CheckBox";
import { ReactComponent as Close } from "statics/svgs/close.svg";
import { ReactComponent as Add } from "statics/svgs/add.svg";

// import Input from "components/Input";

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
      <AddTodo todoHandlers={todoHandlers} />
    </>
  );
}

function AddTodo({ todoHandlers }) {
  const [inp, setInp] = React.useState("");
  const onClick = () => {
    // add todo
    todoHandlers.add({ text: inp });
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
        // onKeyDown={e => {
        //   if (e.key === "Enter") {
        //     onClick();
        //   }
        // }}
      />
    </form>
  );
}

function Todo({ id, text, checked, todoHandlers, updateCardTodos }) {
  const onChange = () => {
    todoHandlers.toggle({ id });
    updateCardTodos();
  };
  return (
    <div className={styles.todoList}>
      <CheckBox
        className={styles.todoCheckbox}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <TextArea
        className={styles.todoTextArea}
        value={text}
        onChange={todoHandlers.makeOnChange(id)}
      />
      <Button onClick={() => todoHandlers.remove({ id })}>
        <Close />
      </Button>
    </div>
  );
}

// function TodoForm({ todoHandlers, updateCardTodos }) {
//   const [todoInp, setTodoInp] = useState("");
//   const handleSubmit = e => {
//     e.preventDefault();
//     todoHandlers.add({ text: todoInp });
//     updateCardTodos();
//     setTodoInp("");
//   };
//   return (
//     <form className={styles.todoList} onSubmit={handleSubmit}>
//       {todoInp === "" ? (
//         <Input
//           className={styles.input}
//           type="text"
//           placeholder="add todo"
//           value={todoInp}
//           onChange={e => setTodoInp(e.target.value)}
//         />
//       ) : (
//         <Todo
//           className={styles.input}
//           type="text"
//           placeholder="add todo"
//           value={todoInp}
//           onChange={e => setTodoInp(e.target.value)}
//         />
//       )}
//     </form>
//   );
// }
