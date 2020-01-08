export const makeInitState = () => ({
  searchedId: [],
  searchingField: "text", // can be : "text" or "label"
  text: "",
  label: "",
  isSearching: false
});

export default function searchReducer(state, action) {
  function isTextInCard({ id, byId, text, todoById }) {
    const card = byId[id];
    const { title, content, todos } = card;
    let reg = new RegExp(text);
    const inTitle = Array.isArray(title.match(reg));
    const inContent = Array.isArray(content.match(reg));
    const inTodos = todos.reduce(
      (acc, todoId) =>
        acc || Array.isArray(todoById[todoId].content.match(reg)),
      false
    );
    // todo is todo XD
    return inTitle || inContent || inTodos;
  }
  function isLabelIdInCard({ cardId, byId, labelId }) {
    const card = byId[cardId];
    return card.labels.findIndex(id => id === labelId) === -1 ? false : true;
  }

  switch (action.type) {
    case "submit": {
      const { byId, allIds, todoById } = action;
      const { text } = state;
      return {
        ...state,
        searchedId: allIds.filter(id =>
          isTextInCard({ id, byId, text, todoById })
        ),
        isSearching: true
      };
    }
    case "clickLabelLink": {
      const { labelId, allIds, byId } = action;
      return {
        ...state,
        searchedId: allIds.filter(cardId =>
          isLabelIdInCard({ cardId, byId, labelId })
        ),
        isSearching: true,
        searchingField: "label"
      };
    }
    case "clickHome": {
      if (state.text === "") {
        return { ...state, label: "", isSearching: false };
      }
      return { ...state, label: "" };
    }
    case "reset": {
      return makeInitState();
    }
    case "change": {
      const { field, payload } = action;
      return {
        ...state,
        [field]: payload
      };
    }
    default:
      throw new Error(`unhandlable type ${action.type}`);
  }
}

searchReducer.types = {
  reset: "reset",
  submit: "submit",
  change: "change"
};
