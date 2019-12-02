import React, { useState } from "react";

export default function Home({ cards, cardHandlers }) {
  return (
    <div>
      <div>
        <CardForm cardHandlers={cardHandlers} />
      </div>
      <div>
        {cards.map(card => (
          <Card key={card.id} {...card} cardHandlers={cardHandlers} />
        ))}
      </div>
    </div>
  );
}

function CardForm({ cardHandlers }) {
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
function Card({ id, header, content, cardHandlers }) {
  const makeOnChange = field => e => {
    cardHandlers.onChange({
      id,
      field,
      payload: e.target.value
    });
  };
  return (
    <div>
      <div>
        Header:
        <input onChange={makeOnChange("header")} value={header} />
      </div>
      <div>
        Content:
        <input onChange={makeOnChange("content")} value={content} />
      </div>
      <div>
        <button onClick={() => cardHandlers.onDeleteClick({ id })}>
          delete {id}
        </button>
      </div>
    </div>
  );
}
