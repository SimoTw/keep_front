import { useReducer, useMemo, useContext, useEffect } from "react";
import useCardMutation from "api/useCardMutation";
import CardContext from "contexts/CardContext";
import LabelContext from "contexts/LabelContext";
import useLabelMutation from "api/useLabelMutation";
import { makeLabel } from "useReducers/useLabel";

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
      return labels;
    }
    default:
      throw new Error(`Unhandled type ${action.type}`);
  }
}

function makeCardLabels(labelState, cardLabelIds) {
  return labelState.allIds.map(id => ({
    ...labelState.byId[id],
    checked: cardLabelIds.includes(id)
  }));
}

/**
 *
 * @param cardLabelIds: []ids
 * @param cardId
 * @param byId from LabelProvider
 * @param allIds from LabelProvider
 * @param cardHandlers from CardProvider
 * @param add from LabelProvider handlers
 */
export default function useCardLabel(cardId) {
  if (!cardId) {
    throw new Error(`useCardLabel required cardId: ${cardId}`);
  }
  const [cardMutationHandlers] = useCardMutation();
  const context = useContext(CardContext);
  if (!context) {
    throw new Error(`useCardLabel must be used within a CardProvider`);
  }
  const [cardState, cardDispatch] = context;

  const fromLabelContext = useContext(LabelContext);
  if (!fromLabelContext) {
    throw new Error(`useCardLabel must be used within a CardProvider`);
  }
  const [labelState, labelDispatch] = fromLabelContext;
  //reset state while get fetch todos
  const [fetchLabelHandlers] = useLabelMutation();

  // const [labels, labelHandlers] = useLabel();
  const cardLabelIds = cardState.byId[cardId].labels;

  const cardLabels = useMemo(() => makeCardLabels(labelState, cardLabelIds), [
    labelState,
    cardLabelIds
  ]);
  const [state, dispatch] = useReducer(cardLabelReducer, cardLabels);
  useEffect(() => {
    dispatch({ type: "reset", labels: cardLabels });
  }, [cardLabels]);

  // label add
  const add = ({ content, to }) => {
    const newLabel = makeLabel({ allIds: labelState.allIds, content, to });
    labelDispatch({ type: "add", label: newLabel });
    fetchLabelHandlers.add(newLabel);
  };

  const addCardLabel = ({ cardId, labelId }) => {
    cardDispatch({ type: "addCardLabel", cardId, labelId });
    cardMutationHandlers.addLabel(cardId, labelId);
  };
  const removeCardLabel = ({ cardId, labelId }) => {
    cardDispatch({ type: "removeCardLabel", cardId, labelId });
    cardMutationHandlers.removeLabel(cardId, labelId);
  };

  const makeOnChange = labelId => () => {
    dispatch({ type: "click", id: labelId });
    if (cardState.byId[cardId].labels.includes(labelId)) {
      removeCardLabel({ cardId, labelId });
    } else {
      addCardLabel({ cardId, labelId });
    }
  };
  const makeOnUncheckClick = id => () => {
    dispatch({ type: "uncheck", id });
    removeCardLabel({ cardId, labelId: id });
  };
  return [state, { makeOnChange, makeOnUncheckClick, add }];
}
