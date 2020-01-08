import React, { useEffect } from "react";
import labelReducer from "reducers/labelReducer";
import LabelContext from "contexts/LabelContext";
import useGet from "api/helpers/useGet";
import { baseURL } from "api/helpers/baseURL";

export default function LabelProvider({ children }) {
  const [state, dispatch] = React.useReducer(labelReducer, {
    byId: {},
    allIds: []
  });
  const { results } = useGet(`${baseURL}/labels/`);

  useEffect(() => {
    const makeById = fetchedLabels => {
      const byId = {};
      fetchedLabels.forEach(label => {
        byId[label.lid] = {
          ...label,
          id: label.lid,
          to: `/label/${label.content}`
        };
        return label;
      });
      return byId;
    };
    dispatch({
      type: labelReducer.types.set,
      labels: {
        byId: makeById(results),
        allIds: results.map(label => label.lid)
      }
    });
  }, [results]);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return (
    <LabelContext.Provider value={value}>{children}</LabelContext.Provider>
  );
}
