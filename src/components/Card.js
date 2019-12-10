import React, { useMemo } from "react";
import cx from "classnames";
import styles from "./Card.module.css";
import makeColorClassNames from "helpers/makeMapPropToColors";
import colorNames from "types/colorNames";
import LabelForm from "components/CardLabels";
import TextArea from "components/TextArea";

// import CardPin from "components/CardPin";
// import Todos from "components/Todos";

export default function Card({ card, labels, cardHandlers, labelHandlers }) {
  const {
    id,
    header,
    content,
    backgroundColor,
    labels: cardLabels
    // todos
    // pinned
  } = card;
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
        <input
          className={styles.header_input}
          type="text"
          onChange={makeOnChange("header")}
          value={header}
        />
        {/* <CardPin id={id} pinned={pinned} cardHandlers={cardHandlers} /> */}
      </div>

      {/* body */}
      <div className={styles.content}>
        <TextArea
          className={styles.textArea}
          onChange={makeOnChange("content")}
          value={content}
        />
      </div>
      {/* <Todos todos={todos} cardHandlers={cardHandlers} id={id} /> */}

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
        <LabelForm
          cardId={id}
          labels={labels}
          cardLabels={cardLabels}
          cardHandlers={cardHandlers}
          labelHandlers={labelHandlers}
        />
        <button onClick={() => cardHandlers.onDeleteClick({ id })}>
          delete {id}
        </button>
      </div>
    </div>
  );
}
