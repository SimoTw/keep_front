import React, { useEffect } from "react";
import cardReducer from "reducers/cardReducer";
import CardContext from "contexts/CardContext";
import useGet from "api/helpers/useGet";
import { baseURL } from "api/helpers/baseURL";

export default function CardProvider({ children }) {
  const [state, dispatch] = React.useReducer(cardReducer, {
    byId: {},
    allIds: []
  });
  const { results } = useGet(`${baseURL}/cards/`);
  useEffect(() => {
    const makeById = fetchedCards => {
      const byId = {};
      fetchedCards.forEach(card => {
        byId[card.cid] = { ...card, id: card.cid };
        return card;
      });
      return byId;
    };
    dispatch({
      type: cardReducer.types.setCards,
      cards: {
        byId: makeById(results),
        allIds: results.reverse().map(card => card.cid)
      }
    });
  }, [results]);
  const value = React.useMemo(() => {
    return [state, dispatch];
  }, [state]);
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
