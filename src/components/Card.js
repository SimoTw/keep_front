import React, { useMemo, useReducer, useState, useEffect } from "react";
import cx from "classnames";
import styles from "./Card.module.css";
import makeColorClassNames from "helpers/makeMapPropToColors";
import colorNames from "types/colorNames";
import useTodo from "reducers/useTodo";

// const todos = [
//   { id: 0, text: "hello", checked: false },
//   { id: 1, text: "hello", checked: false },
//   { id: 0, text: "hello", checked: true }
// ];
export default function Card({
  id,
  header,
  content,
  todos: initTodos,
  backgroundColor,
  cardHandlers,
  pinned,
  labels,
  labelHandlers
}) {
  const [todoInp, setTodoInp] = useState("");
  const [todos, todoHandlers] = useTodo(initTodos);
  const makeOnChange = field => e => {
    cardHandlers.onChange({
      id,
      field,
      payload: e.target.value
    });
  };
  const mapColorNameToState = useMemo(
    () => makeColorClassNames(styles, "container", backgroundColor),
    [backgroundColor]
  );

  console.log("labels", labels);
  return (
    <div className={cx(styles.container, mapColorNameToState)}>
      <div className={styles.header}>
        Header:
        <input type="text" onChange={makeOnChange("header")} value={header} />
        <label>
          pinned:
          <input
            name="pinned"
            type="checkbox"
            checked={pinned}
            onChange={() =>
              cardHandlers.onChange({
                id,
                field: "pinned",
                payload: !pinned
              })
            }
          />
        </label>
      </div>
      <div className={styles.content}>
        Content:
        <input type="text" onChange={makeOnChange("content")} value={content} />
      </div>
      <div className={styles.content}>
        <form
          onSubmit={e => {
            e.preventDefault();
            todoHandlers.add({ text: todoInp });
            cardHandlers.onChange({
              id,
              field: "todos",
              payload: todos
            });
            setTodoInp("");
            console.log("todos", todos);
          }}
        >
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
        Todos:
        {todos.map(({ id, text, checked }) => (
          <div key={id}>
            <label>
              <input
                type="checkbox"
                key={id}
                checked={checked}
                onChange={() => {
                  todoHandlers.toggle({ id });
                  cardHandlers.onChange({
                    id,
                    field: "todos",
                    payload: todos
                  });
                }}
              />
              {text}
            </label>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <select
          value={backgroundColor}
          onChange={makeOnChange("backgroundColor")}
        >
          {colorNames.map(color => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <LabelForm labels={labels} labelHandlers={labelHandlers} />
        <button onClick={() => cardHandlers.onDeleteClick({ id })}>
          delete {id}
        </button>
      </div>
    </div>
  );
}

function cardLabelReducer(state, action) {
  switch (action.type) {
    case "click": {
      const { id } = action;
      return state.map(label =>
        label.id === id ? { ...label, checked: !label.checked } : label
      );
    }
    case "uncheck": {
      const { id } = action;
      return state.map(label =>
        label.id === id ? { ...label, checked: false } : label
      );
    }
    case "reset": {
      const { labels } = action;
      return makeInitState(labels);
    }
    default:
      throw new Error(`Unhandled type ${action.type}`);
  }
}

function makeInitState(labels, checked = []) {
  return labels.map(label => ({
    ...label,
    checked: checked.includes(label.id)
  }));
}

function LabelForm({ labels, labelHandlers }) {
  const [state, dispatch] = useReducer(cardLabelReducer, makeInitState(labels));
  const [inp, setInp] = useState("");
  useEffect(() => {
    dispatch({ type: "reset", labels });
  }, [labels]);
  const makeOnChange = id => () => {
    dispatch({ type: "click", id });
  };

  return (
    <div>
      <ul>
        {state &&
          state
            .filter(({ checked }) => checked === true)
            .map(({ id, text }) => (
              <button
                key={id}
                onClick={() => dispatch({ type: "uncheck", id })}
              >{`${id} ${text}`}</button>
            ))}
      </ul>
      <ul>
        {state &&
          state.map(({ id, text, checked }) => (
            <li key={id}>
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={makeOnChange(id)}
                />
                {text}
              </label>
            </li>
          ))}
        <li>
          <form
            onSubmit={e => {
              e.preventDefault();
              labelHandlers.add({ text: inp, to: `/label/${inp}` });
              setInp("");
            }}
          >
            <label>
              add label
              <input
                type="text"
                value={inp}
                onChange={e => setInp(e.target.value)}
              />
            </label>
            <input type="submit" value="submit" />
          </form>
        </li>
      </ul>
    </div>
  );
}
