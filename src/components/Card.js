import React, { useMemo } from "react";
import cx from "classnames";
import styles from "./Card.module.css";
import makeColorClassNames from "helpers/makeMapPropToColors";
import colorNames from "types/colorNames";

export default function Card({
  id,
  header,
  content,
  backgroundColor,
  cardHandlers
}) {
  const makeOnChange = field => e => {
    // console.log("field", field, "e.target.value", e.target.value);
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
  return (
    <div className={cx(styles.container, mapColorNameToState)}>
      <div className={styles.header}>
        Header:
        <input type="text" onChange={makeOnChange("header")} value={header} />
      </div>
      <div className={styles.content}>
        {" "}
        Content:
        <input type="text" onChange={makeOnChange("content")} value={content} />
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
        <select>
          <option value="tag1">tag1</option>
        </select>
        <button onClick={() => cardHandlers.onDeleteClick({ id })}>
          delete {id}
        </button>
      </div>
    </div>
  );
}
