import { useReducer } from "react";
import * as SearchApi from "js-search";
import useCards from "./useCards";

const reducer = (state, action) => {
  // const searchCard = ({ cards, text }) => {
  //   const buildSearchApi = () => {
  //     const searchApi = new SearchApi.Search("text");
  //     searchApi.addIndex("header");
  //     searchApi.addIndex("content");
  //     searchApi.addDocuments([...cards]);
  //     return searchApi;
  //   };
  //   const searchApi = buildSearchApi();
  //   console.log("search api", searchApi);

  //   let result = searchApi.search("");
  //   console.log(result);
  //   return result;
  // };

  function inSearchedResult({ id, byId, text }) {
    const card = byId[id];
    const { header, content, todo } = card;
    let reg = new RegExp(text);
    const inHeader = text => Array.isArray(header.match(reg));
    const inContent = text => Array.isArray(content.match(reg));
    // todo is todo XD
    return inHeader(text) || inContent(text);
  }

  switch (action.type) {
    case "submit": {
      const { byId, allIds } = action;
      const { text } = state;
      return {
        ...state,
        searchedId: allIds.filter(id => inSearchedResult({ id, byId, text })),
        isSearching: true
      };
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
    // fields: [], // searching fields may be: ["header", "context", "todo"] or ["labels"]
    text: "",
    isSearching: false
  });
  console.log("useSearchedCard", state);
  const reset = () => dispatch({ type: "reset" });
  const submit = () => dispatch({ type: "submit", byId, allIds });
  const makeOnChange = field => e => {
    dispatch({ type: "change", field, payload: e.target.value });
    if (state.isSearching) {
      submit();
    }
  };

  const makeCards = ids => ids.map(id => byId[id]);
  const { isSearching, searchedId } = state;
  // return
  // state: { cards: [list of card to display], search: [state needed for search form]}
  // handlers:
  return [
    {
      // cards: allIds && makeCards(allIds),
      cards: isSearching ? makeCards(searchedId) : makeCards(allIds),
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
