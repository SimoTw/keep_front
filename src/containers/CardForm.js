import React, { useState } from "react";

export default function CardForm({ cardHandlers }) {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (header !== "" || content !== "")
      cardHandlers.onAddClick({ header, content });
    setHeader("");
    setContent("");
  };
  return (
    <form onSubmit={onSubmit}>
      <label>
        Header:
        <input value={header} onChange={e => setHeader(e.target.value)} />
      </label>
      <label>
        Content:
        <input value={content} onChange={e => setContent(e.target.value)} />
      </label>
      <input type="submit" value="submit" />
    </form>
  );
}
