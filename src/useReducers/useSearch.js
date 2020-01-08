import { useContext, useEffect } from "react";
import CardContext from "contexts/CardContext";
import SearchContext from "contexts/SearchContext";
import TodoContext from "contexts/TodoContext";
import LabelContext from "contexts/LabelContext";
import { useLocation } from "react-router-dom";

// limit: useSearch should be only called once
export default function useSearch() {
  const fromCardcontext = useContext(CardContext);
  if (!fromCardcontext) {
    throw new Error(`useSearch must be used within a CardProvider`);
  }
  const [{ byId, allIds }] = fromCardcontext;

  const fromTodoContext = useContext(TodoContext);
  if (!fromTodoContext) {
    throw new Error(`useTodo must be used within a TodoProvider`);
  }
  const [todoState] = fromTodoContext;

  const fromLabelContext = useContext(LabelContext);
  if (!fromLabelContext) {
    throw new Error(`useLabel must be used within a CardProvider`);
  }
  const [labelState] = fromLabelContext;

  const fromSearchContext = useContext(SearchContext);
  if (!fromSearchContext) {
    throw new Error(`useSearch must be used within a SearchProvider`);
  }
  const [state, dispatch] = fromSearchContext;

  const location = useLocation();
  useEffect(() => {
    const locationList = location.pathname.split("/").slice(1);
    if (locationList[0] === "label") {
      const labelId = labelState.allIds
        .map(id => labelState.byId[id])
        .filter(label => label.content === locationList[1])
        .map(label => label.id)[0];
      dispatch({ type: "clickLabelLink", labelId, allIds, byId });
    } else if (locationList[0] === "home") {
      dispatch({ type: "clickHome" });
    }
  }, [location, allIds, byId, dispatch, labelState]);

  const reset = () => dispatch({ type: "reset" });
  const submit = () =>
    dispatch({ type: "submit", byId, allIds, todoById: todoState.byId });
  const makeOnChange = field => e => {
    dispatch({ type: "change", field, payload: e.target.value });
    if (state.isSearching) {
      submit();
    }
  };

  return [state, { reset, submit, makeOnChange }];
}
