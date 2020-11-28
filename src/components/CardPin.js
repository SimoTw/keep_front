import React from "react"

export default function CardPin({ id, pinned, cardHandlers }) {
  return (
    <label>
      pinned:
      <input
        name="pinned"
        type="checkbox"
        checked={pinned}
        onChange={() =>
          cardHandlers.onChange({
            id,
            field: "pinned",
            payload: !pinned,
          })
        }
      />
    </label>
  )
}
