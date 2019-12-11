import { useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";

let count = 0;
export const makeLink = ({ text, to }) => ({
  id: count++,
  text,
  to,
  select: false
});

function linkReducer(state, action) {
  switch (action.type) {
    // link actions
    case useLinks.types.add: {
      const { text, to } = action;
      return [...state, makeLink({ text, to })];
    }
    case useLinks.types.remove: {
      const { id } = action;
      return state.filter(link => link.id !== id);
    }
    case useLinks.types.update: {
      const { id, field, payload } = action;

      return state.map(link =>
        link.id === id ? { ...link, [field]: payload } : link
      );
    }

    case useLinks.types.click: {
      const { id } = action;
      return state.map(link =>
        link.id === id ? { ...link, select: true } : { ...link, select: false }
      );
    }
    case useLinks.types.unclick: {
      return state.map(link => ({ ...link, select: false }));
    }

    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useLinks(initState = []) {
  const [state, dispatch] = useReducer(linkReducer, initState);
  const location = useLocation();
  // compute selected
  useEffect(() => {}, [location]);

  const add = ({ text, to }) =>
    dispatch({ type: useLinks.types.add, text, to });
  const remove = ({ id }) => dispatch({ type: useLinks.types.remove, id });
  const update = ({ id, field, payload }) =>
    dispatch({
      type: useLinks.types.update,
      id,
      field,
      payload
    });
  const click = ({ id }) => dispatch({ type: useLinks.types.click, id });
  const unclick = () => dispatch({ type: useLinks.types.unclick });
  return [state, { add, remove, update, click, unclick }];
}

useLinks.types = {
  add: "add",
  remove: "remove",
  update: "update",
  click: "click",
  unclick: "unclick"
};

export default useLinks;
