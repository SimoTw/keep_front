export default function cardLabelReducer(state, action) {
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
