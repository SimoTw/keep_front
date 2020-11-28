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
  pinned = false,
  contentType = "content",
}) => ({
  id,
  title,
  content,
  cardColor,
  todos,
  pinned,
  contentType,
});

const types = {
  addCard: "addCard",
  changeCard: "changeCard",
  removeCard: "removeCard",
  addCardLabel: "addCardLabel",
  removeCardLabel: "removeCardLabel",
  setCards: "setCards",
};

const initState = {
  byId: {},
  addIds: [],
};

const cardReducer = (state = initState, action) => {
  switch (action.type) {
    case types.addCard: {
      const { card } = action.payload;
      return {
        byId: { ...state.byId, [card.id]: card },
        allIds: [...state.allIds, card.id],
      };
    }
    case types.changeCard: {
      const { id, field, payload } = action;
      return {
        ...state,
        byId: { ...state.byId, [id]: { ...state.byId[id], [field]: payload } },
      };
    }
    case types.removeCard: {
      const { id } = action;
      const nextById = { ...state.byId };
      delete nextById[id];
      return {
        byId: nextById,
        allIds: state.allIds.filter((cardId) => cardId !== id),
      };
    }

    case types.addCardLabel: {
      const { cardId, labelId } = action;

      const nextLabels = [...state.byId[cardId].labels];
      nextLabels.push(labelId);
      return {
        ...state,
        byId: {
          ...state.byId,
          [cardId]: { ...state.byId[cardId], labels: nextLabels },
        },
      };
    }

    case types.removeCardLabel: {
      const { cardId, labelId } = action;

      const nextLabels = [...state.byId[cardId].labels];

      const itemIndex = nextLabels.indexOf(labelId);
      nextLabels.splice(itemIndex, 1);
      return {
        ...state,
        byId: {
          ...state.byId,
          [cardId]: { ...state.byId[cardId], labels: nextLabels },
        },
      };
    }
    case types.setCards: {
      const { cards } = action;
      return cards;
    }

    default:
      return state;
  }
};

const addCard = (card) => ({
  type: types.addCard,
  payload: { card },
});

const changeCard = (id, field, payload) => ({
  type: types.changeCard,
  id,
  field,
  payload,
});

const removeCard = (id) => ({
  type: types.removeCard,
  id,
});

const addCardLable = (cardId, labelId) => ({
  type: types.addCardLabel,
  cardId,
  labelId,
});

const removeCardLabel = (cardId, labelId) => ({
  type: types.removeCardLabel,
  cardId,
  labelId,
});

const actions = {
  addCard,
  changeCard,
  removeCard,
  addCardLable,
  removeCardLabel,
};
