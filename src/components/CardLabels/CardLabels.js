import React, { useState } from "react";
import cx from "classnames";
import { ReactComponent as Add } from "statics/svgs/add.svg";
import { ReactComponent as Close } from "statics/svgs/close.svg";

import CheckBox from "components/CheckBox/CheckBox";
import styles from "./CardLabels.module.css";

export default function LabelForm({ cardLabels, cardLabelHandler }) {
  return (
    <LabelList>
      {/* <AddLabelList add={cardLabelHandler.add} /> */}

      {cardLabels.map(({ id, content, checked }) => (
        <LabelCheckBoxList
          key={id}
          id={id}
          content={content}
          checked={checked}
          onChange={cardLabelHandler.makeOnChange(id)}
          // makeOnChange={makeOnChange}
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
    add({ content: inp, to: `/label/${inp}` });
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

export function LabelCheckBoxList(props) {
  const { id, content, checked, onChange } = props;
  return (
    <li
      key={id}
      className={cx(styles.listItem, styles.listButton)}
      onClick={onChange}
    >
      <CheckBox checked={checked} onChange={onChange} size="xs" />
      <div className={styles.text}>{content}</div>
    </li>
  );
}
