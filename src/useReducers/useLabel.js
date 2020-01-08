import { useContext } from "react";
import getNextId from "helpers/getNextId";
import useLabelMutation from "api/useLabelMutation";
import LabelContext from "contexts/LabelContext";
import labelReducer from "reducers/labelReducer";

export const makeLabel = ({ allIds, content, to }) => ({
  id: getNextId(allIds),
  content,
  to
});

export default function useLabel() {
  const context = useContext(LabelContext);
  if (!context) {
    throw new Error(`useLabel must be used within a CardProvider`);
  }
  const [state, dispatch] = context;
  //reset state while get fetch todos
  const [fetchLabelHandlers] = useLabelMutation();

  const add = ({ content, to }) => {
    const newLabel = makeLabel({ allIds: state.allIds, content, to });
    dispatch({ type: labelReducer.types.add, label: newLabel });
    fetchLabelHandlers.add(newLabel);
  };
  const remove = ({ id }) => dispatch({ type: labelReducer.types.remove, id });
  const update = ({ id, field, payload }) =>
    dispatch({
      type: labelReducer.types.update,
      id,
      field,
      payload
    });
  const labels = state.allIds.map(id => state.byId[id]);

  return [labels, { add, remove, update }];
}
