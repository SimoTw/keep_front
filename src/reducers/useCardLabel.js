import { useEffect, useReducer } from "react";

function cardLabelReducer(state, action) {
  switch (action.type) {
    case "click": {
      const { id } = action;
      return state.map(label =>
        label.id === id ? { ...label, checked: !label.checked } : label
      );
    }
    case "uncheck": {
      const { id } = action;
      return state.map(label =>
        label.id === id ? { ...label, checked: false } : label
      );
    }
    case "reset": {
      const { labels } = action;
      return makeInitState(labels);
    }
    default:
      throw new Error(`Unhandled type ${action.type}`);
  }
}

function makeInitState(labels, checked = []) {
  return labels.map(label => ({
    ...label,
    checked: checked.includes(label.id)
  }));
}

export default function useCardLabel({ labels, labelHandlers, cardId }) {
  console.log("labels", labels);
  const [state, dispatch] = useReducer(cardLabelReducer, makeInitState(labels));
  console.log("state", state);
  useEffect(() => {
    dispatch({ type: "reset", labels });
  }, [labels]);
  const makeOnChange = id => () => {
    labelHandlers.addCard({ id, cardId });
    // labelHandlers.removeCard({ id, cardId });
    dispatch({ type: "click", id });
  };
  const makeOnUncheckClick = id => () => dispatch({ type: "uncheck", id });
  const { add } = labelHandlers;
  return [state, { makeOnChange, makeOnUncheckClick, add }];
}
