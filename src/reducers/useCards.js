import { useReducer } from "react";
import getNextId from "helpers/getNextId";

/**
 * Card
 * id: string
 * header: string
 * content: string, Todo, Image, Link
 * backgroundColor: Color
 * labels: [TagID]
 * time: timeStamp
 *
 *
 * */

const makeCard = ({
  id,
  header = "",
  content = "",
  backgroundColor = "white",
  todos = [],
  labels = [],
  pinned = false
}) => ({
  id,
  header,
  content,
  backgroundColor,
  labels,
  todos,
  pinned
});

const cardReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const { id, header, content } = action;
      let nextId;
      if (!id) nextId = getNextId(state.allIds);
      const newCard = makeCard({ id: nextId, header, content });
      return {
        byId: { ...state.byId, [newCard.id]: newCard },
        allIds: [...state.allIds, newCard.id]
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
        allIds: state.allIds.filter(cardId => cardId === id)
      };
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
  // const initState = {cardForm: makeCard(), cards: []};
  const [state, dispatch] = useReducer(cardReducer, { byId: {}, allIds: [] });
  const onAddClick = ({ header, content }) =>
    dispatch({ type: cardReducer.types.add, header, content });
  const onDeleteClick = ({ id }) =>
    dispatch({ type: cardReducer.types.delete, id });
  const onChange = ({ id, field, payload }) =>
    dispatch({ type: cardReducer.types.change, id, field, payload });

  return [state, { onAddClick, onDeleteClick, onChange }];
}
