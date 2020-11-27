import getNextId from "helpers/getNextId";

export const makelabel = ({ allIds, text, to }) => ({
  id: getNextId(allIds),
  text,
  to,
  select: false,
});

const types = {
  add: "add",
  remove: "remove",
  update: "update",
  set: "set",
};

const initState = {
  byId: {},
  allIds: [],
};

function labelReducer(state = initState, action) {
  switch (action.type) {
    // label actions
    case types.add: {
      const { label } = action;
      return {
        byId: { ...state.byId, [label.id]: label },
        allIds: [...state.allIds, label.id],
      };
    }
    case types.remove: {
      const { id } = action;
      const nextById = { ...state.byId };
      delete nextById[id];
      return {
        byId: nextById,
        allIds: state.allIds.filter((labelId) => labelId !== id),
      };
    }
    case types.update: {
      const { id, field, payload } = action;
      return {
        ...state,
        byId: { ...state.byId, [id]: { ...state.byId[id], [field]: payload } },
      };
    }
    case types.set: {
      const { labels } = action.payload;
      return labels;
    }

    default: {
      return state;
    }
  }
}

const add = (label) => ({
  type: types.add,
  payload: { label },
});

const remove = (id) => ({
  type: types.remove,
  id,
});

const update = (id, field, payload) => ({
  type: types.update,
  id,
  field,
  payload,
});

const set = (labels) => ({
  type: types.set,
  payload: { labels },
});
