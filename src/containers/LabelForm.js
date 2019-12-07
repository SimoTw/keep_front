import React, { useState } from "react";

export default function LabelForm({ labels, handlers }) {
  const [text, setText] = useState("");
  const { add, remove, update } = handlers;
  return (
    <div>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            add({ text, to: `/label/${text}` });
            setText("");
          }}
        >
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <input type="submit" value="add" />
        </form>
      </div>
      {labels.map(({ id, text }) => (
        <Label
          key={id}
          id={id}
          initText={text}
          remove={remove}
          update={update}
        />
      ))}
    </div>
  );
}

function Label({ id, initText, remove, update }) {
  const [text, setText] = useState(initText);
  return (
    <div key={id}>
      <button onClick={() => remove({ id })}>delete</button>
      <form
        onSubmit={e => {
          e.preventDefault();
          update({
            id: id,
            field: "text",
            payload: text
          });
        }}
      >
        <input value={text} onChange={e => setText(e.target.value)} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
