const initState = { byIds: {}, allIds: [] };

const types = {
  add: "add",
  remove: "remove",
  set: "set",
};

/**
 * this is for many to many relations for cards and labels
 */
function cardLabelReducer(state = initState, action) {
  switch (action.type) {
    case types.add: {
      const { cardId, labelId } = action.payload;
      const id = state.allIds[state.addIds.length - 1] + 1 || 0;
      return {
        byIds: {
          ...state.byIds,
          [id]: {
            id,
            cardId,
            labelId,
          },
        },
        allIds: [...state.allIds, id],
      };
    }
    case types.remove: {
      const { id } = action;
      const nextByIds = { ...state.byIds };
      delete nextByIds[id];
      const nextAllIds = [...state.addIds];
      nextAllIds.splice(id, 1);
      return {
        byIds: nextByIds,
        allIds: nextAllIds,
      };
    }
    case types.set: {
      const { labels } = action.payload;
      return labels;
    }
    default:
      return state;
  }
}
