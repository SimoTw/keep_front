import { useEffect, useReducer } from "react"

function cardLabelReducer(state, action) {
  switch (action.type) {
    case "click": {
      const { id } = action
      return state.map((label) =>
        label.id === id ? { ...label, checked: !label.checked } : label
      )
    }
    case "uncheck": {
      const { id } = action
      return state.map((label) =>
        label.id === id ? { ...label, checked: false } : label
      )
    }
    case "reset": {
      const { labels } = action
      return makeInitState(labels)
    }
    default:
      throw new Error(`Unhandled type ${action.type}`)
  }
}

function makeInitState(labels, cardLabels) {
  return labels.map(({ cards, ...label }) => ({
    ...label,
    checked: cardLabels.includes(label.id),
  }))
}

export default function useCardLabel({
  labels,
  labelHandlers,
  cardId,
  cardLabels,
  cardHandlers,
}) {
  const [state, dispatch] = useReducer(
    cardLabelReducer,
    makeInitState(labels, cardLabels)
  )
  useEffect(() => {
    dispatch({ type: "reset", labels, cardLabels })
  }, [labels, cardLabels])
  const makeOnChange = (labelId) => () => {
    const nextCardLabels = [...cardLabels]
    if (cardLabels.includes(labelId)) {
      let index = nextCardLabels.findIndex(labelId)
      if (index >= 0) nextCardLabels.splice(index)
    } else {
      nextCardLabels.push(labelId)
    }
    cardHandlers.onChange({
      id: cardId,
      field: "labels",
      labels: nextCardLabels,
    })
    // labelHandlers.addCard({ id, cardId });
    // labelHandlers.removeCard({ id, cardId });
    // dispatch({ type: "click", id });
  }
  const makeOnUncheckClick = (id) => () => dispatch({ type: "uncheck", id })
  const { add } = labelHandlers
  return [state, { makeOnChange, makeOnUncheckClick, add }]
}
