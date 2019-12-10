import React from "react";
import Card from "components/Card";

export default function Home({ cards, labels, cardHandlers, labelHandlers }) {
  return (
    <div>
      <div>
        <button
          onClick={() => cardHandlers.onAddClick({ contentType: "text" })}
        >
          Add content
        </button>
        <button
          onClick={() => cardHandlers.onAddClick({ contentType: "todo" })}
        >
          Add Todo
        </button>
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
