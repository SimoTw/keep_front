import usePost from "api/helpers/usePost";
import usePut from "api/helpers/usePut";
import useDelete from "api/helpers/useDelete";
import { baseURL } from "api/helpers/baseURL";

export default function useFetchedTodos() {
  const { deleteMethod } = useDelete();
  const { putMethod } = usePut();
  const { postMethod } = usePost();

  const remove = todoId => deleteMethod(`${baseURL}/todos/${todoId}`);
  const update = (todoId, data) =>
    putMethod(`${baseURL}/todos/${todoId}`, data);
  const add = data => {
    postMethod(`${baseURL}/todos`, data);
  };

  return [{ add, update, remove }];
}
