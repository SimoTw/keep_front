import React from "react";
import Card from "components/Card";
import Button from "components/Button";
import { ReactComponent as TodoIcon } from "statics/svgs/check_box.svg";
import { ReactComponent as Edit } from "statics/svgs/edit.svg";

export default function Home({ cards, labels, cardHandlers, labelHandlers }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          width: "600px",
          height: "50px",
          borderRadius: "8px",
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)"
        }}
      >
        <Button
          style={{ flex: "1 1 auto" }}
          onClick={() => cardHandlers.onAddClick({ contentType: "text" })}
        >
          Add Text
          <Edit />
        </Button>
        <Button
          style={{ flex: "1 1 auto" }}
          onClick={() => cardHandlers.onAddClick({ contentType: "todo" })}
        >
          Add Todo
          <TodoIcon />
        </Button>
      </div>
      <div>
        {cards.reverse().map(card => (
          <Card
            key={card.id}
            id={card.id}
            card={card}
            labels={labels}
            cardHandlers={cardHandlers}
            labelHandlers={labelHandlers}
          />
        ))}
      </div>
    </div>
  );
}
