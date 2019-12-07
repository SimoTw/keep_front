import React, { useMemo } from "react";
import cx from "classnames";
import styles from "./Card.module.css";
import makeColorClassNames from "helpers/makeMapPropToColors";
import colorNames from "types/colorNames";
import Todos from "components/Todos";
import LabelForm from "components/CardLabels";
import CardPin from "components/CardPin";

export default function Card({
  id,
  header,
  content,
  todos,
  backgroundColor,
  pinned,
  labels,
  cardHandlers,

  labelHandlers
}) {
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

  return (
    <div className={cx(styles.container, mapColorNameToState)}>
      {/* header */}
      <div className={styles.header}>
        Header:
        <input type="text" onChange={makeOnChange("header")} value={header} />
        <CardPin id={id} pinned={pinned} cardHandlers={cardHandlers} />
      </div>

      {/* body */}
      <div className={styles.content}>
        Content:
        <input type="text" onChange={makeOnChange("content")} value={content} />
      </div>
      <Todos todos={todos} cardHandlers={cardHandlers} id={id} />

      {/* footer */}
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
        <LabelForm cardId={id} labels={labels} labelHandlers={labelHandlers} />
        <button onClick={() => cardHandlers.onDeleteClick({ id })}>
          delete {id}
        </button>
      </div>
    </div>
  );
}
