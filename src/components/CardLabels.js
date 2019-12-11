import React, { useState } from "react";
import { ReactComponent as Add } from "statics/svgs/add.svg";
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
    <div className={styles.list}>
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
    </div>
  );
}

function AddLabelList({ add }) {
  const [inp, setInp] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    add({ text: inp, to: `/label/${inp}` });
    setInp("");
  };
  const onChange = e => setInp(e.target.value);
  return (
    <form className={styles.listItem} onSubmit={onSubmit}>
      <input
        className={styles.input}
        placeholder="add label"
        type="text"
        value={inp}
        onChange={onChange}
      />
      <Add style={{ width: "18px", height: "18px" }} />
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
    <li key={id} className={styles.listItem} onClick={makeOnChange(id)}>
      <CheckBox checked={checked} onChange={makeOnChange(id)} size="xs" />
      <div className={styles.text}>{text}</div>
    </li>
  );
}
