function reducer(state, action) {
  switch (action.type) {
    case "search": {
      return state;
    }
    case "change": {
      return state;
    }
    case "reset": {
      return state;
    }
    default:
      throw new Error(`unhandlable type ${action.type}`);
  }
}
