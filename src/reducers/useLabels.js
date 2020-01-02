import { useReducer, useEffect } from "react";
import useFetchedLabels from "api/useFetchedLabels";
import getNextId from "helpers/getNextId";

export const makelabel = ({ allIds, text, to }) => ({
  id: getNextId(allIds),
  text,
  to,
  select: false
});

function labelReducer(state, action) {
  switch (action.type) {
    // label actions
    case useLabels.types.add: {
      const { label } = action;
      return {
        byId: { ...state.byId, [label.id]: label },
        allIds: [...state.allIds, label.id]
      };
    }
    case useLabels.types.remove: {
      const { id } = action;
      const nextById = { ...state.byId };
      delete nextById[id];
      return {
        byId: nextById,
        allIds: state.allIds.filter(labelId => labelId !== id)
      };
    }
    case useLabels.types.update: {
      const { id, field, payload } = action;
      return {
        ...state,
        byId: { ...state.byId, [id]: { ...state.byId[id], [field]: payload } }
      };
    }
    case "set": {
      const { labels } = action;
      return labels;
    }

    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export default function useLabels() {
  const [state, dispatch] = useReducer(labelReducer, {
    byId: {},
    allIds: []
  });
  const [fetchedLabels, fetchLabelHandlers] = useFetchedLabels();
  useEffect(() => {
    const makeById = fetchedLabels => {
      const byId = {};
      fetchedLabels.forEach(label => {
        byId[label.lid] = { ...label, id: label.lid };
        return label;
      });
      return byId;
    };
    dispatch({
      type: "set",
      labels: {
        byId: makeById(fetchedLabels),
        allIds: fetchedLabels.map(label => label.lid)
      }
    });
  }, [fetchedLabels]);
  const add = ({ text, to }) => {
    const newLabel = makelabel({ allIds: state.allIds, text, to });
    dispatch({ type: useLabels.types.add, label: newLabel });
    fetchLabelHandlers.add(newLabel);
  };
  const remove = ({ id }) => dispatch({ type: useLabels.types.remove, id });
  const update = ({ id, field, payload }) =>
    dispatch({
      type: useLabels.types.update,
      id,
      field,
      payload
    });

  return [state, { add, remove, update }];
}

useLabels.types = {
  add: "add",
  remove: "remove",
  update: "update"
};
