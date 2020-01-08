import { useContext } from "react";
import CardContext from "contexts/CardContext";
import SearchContext from "contexts/SearchContext";
import cardReducer from "reducers/cardReducer";
import getNextId from "helpers/getNextId";
import useCardMutation from "api/useCardMutation";

/**
 * Card
 * id: string
 * title: string
 * content: string, Todo, Image, Link
 * cardColor: Color
 * labels: [TagID]
 * time: timeStamp
 *
 *
 * */

const makeCard = ({
  id,
  title = "",
  content = "",
  cardColor = "white",
  todos = [],
  labels = [],
  pinned = false,
  contentType = "content"
}) => ({
  id,
  title,
  content,
  cardColor,
  labels,
  todos,
  pinned,
  contentType
});

export default function useCard() {
  // card context
  const [cardMutationHandlers] = useCardMutation();
  const context = useContext(CardContext);
  if (!context) {
    throw new Error(`useCard must be used within a CardProvider`);
  }
  const [state, dispatch] = context;

  const fromSearchcontext = useContext(SearchContext);
  if (!fromSearchcontext) {
    throw new Error(`useCard must be used within a SearchProvider`);
  }
  const [searchState] = fromSearchcontext;

  const onAddClick = ({ title, content, contentType }) => {
    let nextId = getNextId(state.allIds);
    const card = makeCard({ id: nextId, title, content, contentType });
    dispatch({ type: cardReducer.types.add, card });

    cardMutationHandlers.add({ ...card, cid: card.id });
  };
  const onDeleteClick = ({ id }) => {
    dispatch({ type: cardReducer.types.delete, id });
    cardMutationHandlers.remove(id);
  };
  const onChange = ({ id, field, payload }) => {
    dispatch({ type: cardReducer.types.change, id, field, payload });
    cardMutationHandlers.update(id, { [field]: payload });
  };
  const addCardLabel = ({ cardId, labelId }) => {
    dispatch({ type: cardReducer.types.addCardLabel, cardId, labelId });
    cardMutationHandlers.addLabel(cardId, labelId);
  };
  const removeCardLabel = ({ cardId, labelId }) => {
    dispatch({ type: cardReducer.types.removeCardLabel, cardId, labelId });
    cardMutationHandlers.removeLabel(cardId, labelId);
  };

  return [
    searchState.isSearching
      ? searchState.searchedId.map(id => state.byId[id])
      : state.allIds.map(id => state.byId[id]),
    { onAddClick, onDeleteClick, onChange, addCardLabel, removeCardLabel },
    state
  ];
}
