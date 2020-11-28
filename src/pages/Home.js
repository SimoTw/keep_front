import React from "react"
import styles from "./Home.module.css"
import Card from "components/Card"
import AddCardButtonList from "components/AddCardButtonList"

export default function Home({ cards, labels, cardHandlers, labelHandlers }) {
  return (
    <div className={styles.sectionContainenr}>
      <AddCardButtonList cardHandlers={cardHandlers} />
      <div>
        {cards.reverse().map((card) => (
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
  )
}
