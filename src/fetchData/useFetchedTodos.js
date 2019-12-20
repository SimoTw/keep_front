import useGet from "./helpers/useGet";
import usePost from "fetchData/helpers/usePost";
import usePut from "fetchData/helpers/usePut";
import useDelete from "fetchData/helpers/useDelete";

const baseURL = "http://localhost:8080/api";

export default function useFetchedTodos() {
  //   const [todos, isGettingTodos, reget] = useGet(
  //     `http://localhost:8080/api/cards/${cardId}/todos`
  //   );
  const [todosById, isGettingTodos, reget] = useGet(`${baseURL}/todos`);
  const [deleteMethod] = useDelete();
  const [putMethod, putResult] = usePut();
  const [postMethod, postResults] = usePost();

  const remove = todoId => deleteMethod(`${baseURL}/todos/${todoId}`);
  const update = (todoId, data) =>
    putMethod(`${baseURL}/todos/${todoId}`, data);
  const add = data => {
    postMethod(`${baseURL}/todos`, data);
  };

  return [todosById, { reget, add, update, remove }];
}
