export default function labelReducer(state, action) {
  switch (action.type) {
    // label actions
    case labelReducer.types.add: {
      const { label } = action;
      return {
        byId: { ...state.byId, [label.id]: label },
        allIds: [...state.allIds, label.id]
      };
    }
    case labelReducer.types.remove: {
      const { id } = action;
      const nextById = { ...state.byId };
      delete nextById[id];
      return {
        byId: nextById,
        allIds: state.allIds.filter(labelId => labelId !== id)
      };
    }
    case labelReducer.types.update: {
      const { id, field, payload } = action;
      return {
        ...state,
        byId: { ...state.byId, [id]: { ...state.byId[id], [field]: payload } }
      };
    }
    case labelReducer.types.set: {
      const { labels } = action;
      return labels;
    }

    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

labelReducer.types = {
  add: "add",
  remove: "remove",
  update: "update",
  set: "set"
};
