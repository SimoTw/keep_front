import React from "react";
import searchReducer, { makeInitState } from "reducers/searchReducer";
import SearchContext from "contexts/SearchContext";

export default function SearchProvider({ children }) {
  const [state, dispatch] = React.useReducer(searchReducer, makeInitState());
  const value = React.useMemo(() => [state, dispatch], [state]);
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
