import useGet from "./helpers/useGet";
import usePost from "fetchData/helpers/usePost";
import usePut from "fetchData/helpers/usePut";
import useDelete from "fetchData/helpers/useDelete";

const baseURL = "http://localhost:8080/api";

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
