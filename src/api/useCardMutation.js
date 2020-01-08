import usePost from "api/helpers/usePost";
import usePut from "api/helpers/usePut";
import useDelete from "api/helpers/useDelete";
import { baseURL } from "api/helpers/baseURL";

export default function useCardMutation() {
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
  return [{ add, update, remove, addLabel, removeLabel }];
}
