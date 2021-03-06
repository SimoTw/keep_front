import useGet from "api/helpers/useGet";
import usePost from "api/helpers/usePost";
import usePut from "api/helpers/usePut";
import useDelete from "api/helpers/useDelete";
import { baseURL } from "api/helpers/baseURL";

export default function useFetchedCards() {
  const { results: cards, reget } = useGet(`${baseURL}/cards/`);
  const { deleteMethod } = useDelete();
  const { putMethod } = usePut();
  const { postMethod } = usePost();

  const remove = cardId => deleteMethod(`${baseURL}/cards/${cardId}`);
  const update = (cardId, data) =>
    putMethod(`${baseURL}/cards/${cardId}`, data);
  const add = data => {
    postMethod(`${baseURL}/cards/`, data);
  };
  const addLabel = (cardId, labelId) => {
    postMethod(`${baseURL}/cards/${cardId}/labels/${labelId}`);
  };
  const removeLabel = (cardId, labelId) => {
    deleteMethod(`${baseURL}/cards/${cardId}/labels/${labelId}`);
  };
  return [cards, { reget, add, update, remove, addLabel, removeLabel }];
}
