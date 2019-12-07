import { useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCards from "./useCards";

const reducer = (state, action) => {
  function inSearchedTextResult({ id, byId, text }) {
    const card = byId[id];
    const { header, content, todos } = card;
    let reg = new RegExp(text);
    const inHeader = Array.isArray(header.match(reg));
    const inContent = Array.isArray(content.match(reg));
    const inTodos = todos.reduce(
      (acc, todo) => acc || Array.isArray(todo.text.match(reg)),
      false
    );
    // todo is todo XD
    return inHeader || inContent || inTodos;
  }
  function inSearchedLabelResult({ id, byId, label }) {
    const card = byId[id];
    const { labels } = card;
    console.log("label", label, "labels", labels);
    for (let cardLabel of labels) {
      if (cardLabel === label) {
        return true;
      }
    }
    return false;
  }

  switch (action.type) {
    case "submit": {
      const { byId, allIds } = action;
      const { text } = state;
      return {
        ...state,
        searchedId: allIds.filter(id =>
          inSearchedTextResult({ id, byId, text })
        ),
        isSearching: true
      };
    }
    case "clickLabelLink": {
      const { label, allIds, byId } = action;
      return {
        ...state,
        searchedId: allIds.filter(id =>
          inSearchedLabelResult({ id, byId, label })
        ),
        isSearching: true,
        searchingField: "label",
        label
      };
    }
    case "clickHome": {
      if (state.text === "") {
        return { ...state, label: "", isSearching: false };
      }
      return { ...state, label: "" };
    }
    case "reset": {
      return {
        // field: "",
        text: "",
        isSearching: false,
        searchedId: []
      };
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
  const [state, dispatch] = useReducer(reducer, {
    searchedId: [],
    searchingField: "text", // can be : "text" or "label"
    text: "",
    label: "",
    isSearching: false
  });

  // capture label clicks by url

  const location = useLocation();
  useEffect(() => {
    const _clickLabelLink = label =>
      dispatch({ type: "clickLabelLink", label, allIds, byId });
    const _clickHome = () => dispatch({ type: "clickHome" });
    const locationList = location.pathname.split("/").slice(1);
    if (locationList[0] === "label") {
      _clickLabelLink(locationList[1]);
    }
    if (locationList[0] === "home") {
      _clickHome();
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

  // private helpers
  // const _getRenderIds = state => {
  //   const { searchedId, searchingField, text, label } = state;
  //   if ()
  //   switch(searchingField) {
  //     case "text": {

  //     }
  //     case "label": {

  //     }
  //     default:
  //       throw new Error(`unhandlable searchingField ${searchingField}`);
  //   }
  //   return searchingField === "text" ? searchedId : searchedId;
  // };

  const _makeCards = ids => ids.map(id => byId[id]);

  // const renderIds = _getRenderIds(state);
  // return
  // state: { cards: [list of card to display], search: [state needed for search form]}
  // handlers:
  const { isSearching, searchedId } = state;
  console.log("state", state);
  return [
    {
      // cards: allIds && makeCards(allIds),
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
