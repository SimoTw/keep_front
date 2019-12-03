import { useReducer } from "react";
import getNextId from "helpers/getNextId";

/**
 * Card
 * id: string
 * header: string
 * content: string, Todo, Image, Link
 * backgroundColor: Color
 * tags: [TagID]
 * time: timeStamp
 *
 *
 * */

const makeCard = ({
  id,
  header = "",
  content = "",
  backgroundColor = "white",
  tags = []
}) => ({
  id,
  header,
  content,
  backgroundColor,
  tags
});

const cardReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const { id, header, content } = action;
      let nextId;
      if (!id) nextId = getNextId(state);
      return [...state, makeCard({ id: nextId, header, content })];
    }
    case "change": {
      const { id, field, payload } = action;
      return state.map(card =>
        card.id === id ? { ...card, [field]: payload } : card
      );
    }
    case "delete": {
      const { id } = action;
      return state.filter(card => card.id !== id);
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
  const [state, dispatch] = useReducer(cardReducer, []);
  const onAddClick = ({ header, content }) =>
    dispatch({ type: cardReducer.types.add, header, content });
  const onDeleteClick = ({ id }) =>
    dispatch({ type: cardReducer.types.delete, id });
  const onChange = ({ id, field, payload }) =>
    dispatch({ type: cardReducer.types.change, id, field, payload });
  return [state, { onAddClick, onDeleteClick, onChange }];
}
