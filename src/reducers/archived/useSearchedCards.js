import { useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCards from "./Card/_useCards";

const makeInitState = () => ({
  searchedId: [],
  searchingField: "text", // can be : "text" or "label"
  text: "",
  label: "",
  isSearching: false
});

const reducer = (state, action) => {
  function isTextInCard({ id, byId, text }) {
    const card = byId[id];
    const { title, content, todos } = card;
    let reg = new RegExp(text);
    const inTitle = Array.isArray(title.match(reg));
    const inContent = Array.isArray(content.match(reg));
    const inTodos = todos.reduce(
      (acc, todo) => acc || Array.isArray(todo.text.match(reg)),
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
      const { byId, allIds } = action;
      const { text } = state;
      return {
        ...state,
        searchedId: allIds.filter(id => isTextInCard({ id, byId, text })),
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
};

export default function useSearchedCard() {
  const [{ byId, allIds }, cardHandlers] = useCards();
  const [state, dispatch] = useReducer(reducer, makeInitState());
  // change search result by capture url changes
  const location = useLocation();
  useEffect(() => {
    const locationList = location.pathname.split("/").slice(1);
    if (locationList[0] === "label") {
      const { labelId } = location.state;
      (labelId => dispatch({ type: "clickLabelLink", labelId, allIds, byId }))(
        labelId
      );
    } else if (locationList[0] === "home") {
      (() => dispatch({ type: "clickHome" }))();
    }
  }, [location, allIds, byId]);

  // search from methods
  const reset = () => dispatch({ type: "reset" });
  const submit = () => dispatch({ type: "submit", byId, allIds });
  const makeOnChange = field => e => {
    dispatch({ type: "change", field, payload: e.target.value });
    if (state.isSearching) {
      submit();
    }
  };

  const _makeCards = ids => ids.map(id => byId[id]);

  // return
  // state: { cards: [list of card to display], search: [state needed for search form]}
  // handlers:
  const { isSearching, searchedId } = state;

  // const searchedCards = _makeCards(searchedId);
  // // const allCards = _makeCards(allIds);
  // const allCards = allIds.map(id => byId)
  // console.log({ byId, allIds, searchedCards, allCards });

  return [
    {
      cards: isSearching ? _makeCards(searchedId) : _makeCards(allIds),
      search: state
    },
    { search: { reset, submit, makeOnChange }, cards: cardHandlers }
  ];
}

useSearchedCard.types = {
  reset: "reset",
  submit: "submit",
  change: "change"
};
