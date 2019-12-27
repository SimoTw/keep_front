import useGet from "./helpers/useGet";
import usePost from "api/helpers/usePost";
import usePut from "api/helpers/usePut";
import useDelete from "api/helpers/useDelete";
import { baseURL } from "api/helpers/baseURL";

export default function useFetchedLabels() {
  const { results: labels, reget } = useGet(`${baseURL}/labels/`);
  const { deleteMethod } = useDelete();
  const { putMethod } = usePut();
  const { postMethod } = usePost();

  const remove = labelId => deleteMethod(`${baseURL}/labels/${labelId}`);
  const update = (labelId, data) =>
    putMethod(`${baseURL}/labels/${labelId}`, data);
  const add = data => {
    postMethod(`${baseURL}/labels/`, data);
  };

  return [labels, { reget, add, update, remove }];
}
