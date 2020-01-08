const cardReducer = (state, action) => {
  switch (action.type) {
    case cardReducer.types.add: {
      const { card } = action;

      return {
        byId: { ...state.byId, [card.id]: card },
        allIds: [card.id, ...state.allIds]
      };
    }
    case cardReducer.types.change: {
      const { id, field, payload } = action;
      return {
        ...state,
        byId: { ...state.byId, [id]: { ...state.byId[id], [field]: payload } }
      };
    }
    case cardReducer.types.delete: {
      const { id } = action;
      const nextById = { ...state.byId };
      delete nextById[id];
      return {
        byId: nextById,
        allIds: state.allIds.filter(cardId => cardId !== id)
      };
    }

    case cardReducer.types.addCardLabel: {
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

    case cardReducer.types.removeCardLabel: {
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
    case cardReducer.types.setCards: {
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
  delete: "delete",
  addCardLabel: "addCardLabel",
  removeCardLabel: "removeCardLabel",
  setCards: "setCards"
};

export default cardReducer;
