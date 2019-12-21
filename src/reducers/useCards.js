import { useReducer, useEffect } from "react";
import getNextId from "helpers/getNextId";
import useFetchedCards from "fetchData/useFetchedCards";
/**
 * Card
 * id: string
 * title: string
 * content: string, Todo, Image, Link
 * backgroundColor: Color
 * labels: [TagID]
 * time: timeStamp
 *
 *
 * */

const makeCard = ({
  id,
  title = "",
  content = "",
  backgroundColor = "white",
  todos = [],
  labels = [],
  pinned = false,
  contentType = "content"
}) => ({
  id,
  title,
  content,
  backgroundColor,
  labels,
  todos,
  pinned,
  contentType
});

const cardReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const { card } = action;

      return {
        byId: { ...state.byId, [card.id]: card },
        allIds: [...state.allIds, card.id]
      };
    }
    case "change": {
      const { id, field, payload } = action;
      return {
        ...state,
        byId: { ...state.byId, [id]: { ...state.byId[id], [field]: payload } }
      };
    }
    case "delete": {
      const { id } = action;
      const nextById = { ...state.byId };
      delete nextById[id];
      return {
        byId: nextById,
        allIds: state.allIds.filter(cardId => cardId !== id)
      };
    }

    case "addCardLabel": {
      const { cardId, labelId } = action;

      const nextLabels = [...state.byId[cardId].labels];
      nextLabels.push(labelId);
      return {
        ...state,
        byId: {
          ...state.byId,
          [cardId]: { ...state.byId[cardId], labels: nextLabels }
        }
      };
    }

    case "removeCardLabel": {
      const { cardId, labelId } = action;

      const nextLabels = [...state.byId[cardId].labels];

      const itemIndex = nextLabels.indexOf(labelId);
      nextLabels.splice(itemIndex, 1);
      return {
        ...state,
        byId: {
          ...state.byId,
          [cardId]: { ...state.byId[cardId], labels: nextLabels }
        }
      };
    }
    case "setCards": {
      const { cards } = action;
      return cards;
    }

    default:
      throw new Error(`unhandlable types: ${action.type}`);
  }
};

cardReducer.types = {
  add: "add",
  change: "change",
  delete: "delete"
};

export default function useCards() {
  const [state, dispatch] = useReducer(cardReducer, { byId: {}, allIds: [] });
  const [fetchCards, fetchCardHandlers] = useFetchedCards();

  useEffect(() => {
    const makeById = fetchCards => {
      const byId = {};
      fetchCards.forEach(card => {
        byId[card.cid] = { ...card, id: card.cid };
        return card;
      });
      return byId;
    };
    dispatch({
      type: "setCards",
      cards: {
        byId: makeById(fetchCards),
        allIds: fetchCards.map(card => card.cid)
      }
    });
  }, [fetchCards]);
  // const initState = {cardForm: makeCard(), cards: []};
  const onAddClick = ({ title, content, contentType }) => {
    let nextId = getNextId(state.allIds);
    const card = makeCard({ id: nextId, title, content, contentType });
    console.log({ nextId, card, allIds: state.allIds });
    dispatch({ type: cardReducer.types.add, card });
    fetchCardHandlers.add({ ...card, cid: card.id });
  };
  const onDeleteClick = ({ id }) => {
    dispatch({ type: cardReducer.types.delete, id });
    fetchCardHandlers.remove(id);
  };
  const onChange = ({ id, field, payload }) => {
    dispatch({ type: cardReducer.types.change, id, field, payload });
    fetchCardHandlers.update(id, { [field]: payload });
  };
  const addCardLabel = ({ cardId, labelId }) => {
    dispatch({ type: "addCardLabel", cardId, labelId });
    fetchCardHandlers.addLabel(cardId, labelId);
  };
  const removeCardLabel = ({ cardId, labelId }) => {
    dispatch({ type: "removeCardLabel", cardId, labelId });
    fetchCardHandlers.removeLabel(cardId, labelId);
  };
  return [
    state,
    { onAddClick, onDeleteClick, onChange, addCardLabel, removeCardLabel }
  ];
}
