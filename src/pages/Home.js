import React from "react";
import Card from "components/Card";
import CardForm from "containers/CardForm";

export default function Home({ cards, labels, cardHandlers, labelHandlers }) {
  return (
    <div>
      <div>
        <CardForm cardHandlers={cardHandlers} />
      </div>
      <div>
        {cards.map(card => (
          <Card
            key={card.id}
            {...card}
            labels={labels}
            cardHandlers={cardHandlers}
            labelHandlers={labelHandlers}
          />
        ))}
      </div>
    </div>
  );
}
