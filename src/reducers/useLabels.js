import { useReducer } from "react";

let count = 0;
export const makelabel = ({ text, to }) => ({
  id: count++,
  text,
  to,
  select: false
});

function labelReducer(state, action) {
  switch (action.type) {
    // label actions
    case useLabels.types.add: {
      const { text, to } = action;
      return [...state, makelabel({ text, to })];
    }
    case useLabels.types.remove: {
      const { id } = action;
      return state.filter(label => label.id !== id);
    }
    case useLabels.types.update: {
      const { id, field, payload } = action;

      return state.map(label =>
        label.id === id ? { ...label, [field]: payload } : label
      );
    }

    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useLabels(initState = []) {
  const [state, dispatch] = useReducer(labelReducer, initState);

  const add = ({ text, to }) =>
    dispatch({ type: useLabels.types.add, text, to });
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

export default useLabels;
