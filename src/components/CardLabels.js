import React, { useState } from "react";
import cx from "classnames";
import { ReactComponent as Add } from "statics/svgs/add.svg";
import { ReactComponent as Close } from "statics/svgs/close.svg";

import CheckBox from "components/CheckBox";
import styles from "./CardLabels.module.css";

export default function LabelForm({
  labels: initLabels,
  labelHandlers,
  cardId,
  cardHandlers,
  cardLabels
}) {
  function makeLabels(labels, cardLabels) {
    return labels.map(({ cards, ...label }) => ({
      ...label,
      checked: cardLabels.includes(label.id)
    }));
  }
  // const makeOnUncheckClick = (cardId => labelId => () => {
  //   cardHandlers.removeCardLabel({ cardId, labelId });
  // })(cardId);
  const makeOnChange = (cardId => labelId => () => {
    if (cardLabels.includes(labelId)) {
      cardHandlers.removeCardLabel({ cardId, labelId });
    } else {
      cardHandlers.addCardLabel({ cardId, labelId });
    }
  })(cardId);
  let labels = makeLabels(initLabels, cardLabels);
  return (
    <LabelList>
      <AddLabelList add={labelHandlers.add} />

      {labels.map(({ id, text, checked }) => (
        <LabelCheckBoxList
          key={id}
          id={id}
          text={text}
          checked={checked}
          makeOnChange={makeOnChange}
        />
      ))}
    </LabelList>
  );
}

export function LabelList({ children, className, ...props }) {
  return (
    <div className={cx(styles.list, className)} {...props}>
      {children}
    </div>
  );
}

export function AddLabelList({ add }) {
  const [inp, setInp] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    add({ text: inp, to: `/label/${inp}` });
    setInp("");
  };
  const onChange = e => setInp(e.target.value);
  const onClear = () => setInp("");
  return (
    <form className={styles.listItem} onSubmit={onSubmit}>
      <Add style={{ width: "18px", height: "18px" }} onClick={onSubmit} />
      <input
        className={styles.input}
        placeholder="add label"
        type="text"
        value={inp}
        onChange={onChange}
      />
      <Close onClick={onClear} />
    </form>
  );
}

export function LabelButtonList({ labels, makeOnUncheckClick }) {
  return (
    <>
      {labels
        .filter(({ checked }) => checked === true)
        .map(({ id, text }) => (
          <LabelButton
            key={id}
            id={id}
            text={text}
            makeOnUncheckClick={makeOnUncheckClick}
          />
        ))}
    </>
  );
}

function LabelButton({ id, text, makeOnUncheckClick }) {
  return (
    <button key={id} onClick={makeOnUncheckClick(id)}>{`${id} ${text}`}</button>
  );
}

export function LabelCheckBoxList({ id, text, checked, makeOnChange }) {
  return (
    <li
      key={id}
      className={cx(styles.listItem, styles.listButton)}
      onClick={makeOnChange(id)}
    >
      <CheckBox checked={checked} onChange={makeOnChange(id)} size="xs" />
      <div className={styles.text}>{text}</div>
    </li>
  );
}
