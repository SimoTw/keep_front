import React, { useState } from "react";
import useCardLabel from "reducers/useCardLabel";

export default function LabelForm({
  labels: initLabels,
  labelHandlers,
  cardId
}) {
  const [labels, { add, makeOnUncheckClick, makeOnChange }] = useCardLabel({
    labels: initLabels,
    labelHandlers,
    cardId
  });
  return (
    <div>
      <LabelButtonList
        labels={labels}
        makeOnUncheckClick={makeOnUncheckClick}
      />
      <ul>
        {labels.map(({ id, text, checked }) => (
          <LabelCheckBoxList
            key={id}
            id={id}
            text={text}
            checked={checked}
            makeOnChange={makeOnChange}
          />
        ))}
        <AddLabelList add={add} />
      </ul>
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
    <li>
      <form onSubmit={onSubmit}>
        <label>
          add label
          <input type="text" value={inp} onChange={onChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
    </li>
  );
}

export function LabelButtonList({ labels, makeOnUncheckClick }) {
  return (
    <ul>
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
    </ul>
  );
}

function LabelButton({ id, text, makeOnUncheckClick }) {
  return (
    <button key={id} onClick={makeOnUncheckClick(id)}>{`${id} ${text}`}</button>
  );
}

export function LabelCheckBoxList({ id, text, checked, makeOnChange }) {
  return (
    <li key={id}>
      <label>
        <input type="checkbox" checked={checked} onChange={makeOnChange(id)} />
        {text}
      </label>
    </li>
  );
}
