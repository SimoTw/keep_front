import React, { useState } from "react";

export default function TagForm({ tags, sidebarHandlers }) {
  const [text, setText] = useState("");
  const { addLink, deleteLink, updateLink } = sidebarHandlers;
  return (
    <div>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addLink({ field: "tags", text });
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
      {tags.map(tag => (
        <div key={tag.id}>
          <button onClick={() => deleteLink({ id: tag.id, field: "tags" })}>
            delete
          </button>
          <form>
            <input
              value={tag.text}
              onChange={e =>
                updateLink({
                  id: tag.id,
                  field: "tags/text",
                  payload: e.target.value
                })
              }
            />
          </form>
        </div>
      ))}
    </div>
  );
}
