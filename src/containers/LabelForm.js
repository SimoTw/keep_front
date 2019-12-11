import React, { useState } from "react";
import { AddLabelList, LabelList } from "components/CardLabels";
import styles from "./LabelForm.module.css";
import { ReactComponent as LabelIcon } from "statics/svgs/label.svg";
import { ReactComponent as Close } from "statics/svgs/close.svg";

export default function LabelForm({ labels, handlers }) {
  const { add, remove, update } = handlers;
  return (
    <LabelList>
      <AddLabelList add={add} />
      {labels.map(({ id, text }) => (
        <Label
          key={id}
          id={id}
          initText={text}
          remove={remove}
          update={update}
        />
      ))}
    </LabelList>
  );
}

function Label({ id, initText, remove, update }) {
  const [text, setText] = useState(initText);
  return (
    <form
      className={styles.listItem}
      onSubmit={e => {
        e.preventDefault();
        update({
          id: id,
          field: "text",
          payload: text
        });
      }}
    >
      <LabelIcon />

      <input
        className={styles.input}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Close onClick={() => remove({ id })} />
    </form>
  );
}
