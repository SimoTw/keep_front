import useGet from "./helpers/useGet"
import usePost from "api/helpers/usePost"
import usePut from "api/helpers/usePut"
import useDelete from "api/helpers/useDelete"
import { baseURL } from "api/helpers/baseURL"

export default function useFetchedTodos() {
  //   const [todos, isGettingTodos, reget] = useGet(
  //     `http://localhost:8080/api/cards/${cardId}/todos`
  //   );
  const { results: todosById, reget } = useGet(`${baseURL}/todos`)
  const { deleteMethod } = useDelete()
  const { putMethod } = usePut()
  const { postMethod } = usePost()

  const remove = (todoId) => deleteMethod(`${baseURL}/todos/${todoId}`)
  const update = (todoId, data) => putMethod(`${baseURL}/todos/${todoId}`, data)
  const add = (data) => {
    postMethod(`${baseURL}/todos`, data)
  }

  return [todosById, { reget, add, update, remove }]
}
