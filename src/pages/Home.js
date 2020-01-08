import React, { useMemo } from "react";
import styles from "./Home.module.css";
import Card from "components/Card/Card";
import AddCardButtonList from "components/AddCardButtonList/AddCardButtonList";
import useCard from "useReducers/useCard";

export default function Home() {
  const [cards, cardHandlers] = useCard();
  const renderCards = useMemo(
    () =>
      cards.map(card => (
        <Card key={card.id} card={card} cardHandlers={cardHandlers} />
      )),
    [cards, cardHandlers]
  );
  return (
    <div className={styles.sectionContainenr}>
      <AddCardButtonList cardHandlers={cardHandlers} />
      <div>{renderCards}</div>
    </div>
  );
}
