import React from "react";
import Card from "components/Card";
import CardForm from "containers/CardForm";

export default function Home({ cards, cardHandlers }) {
  // console.log("cards", cards);
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
