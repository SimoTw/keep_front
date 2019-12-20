import useGet from "./helpers/useGet";
import usePost from "fetchData/helpers/usePost";
import usePut from "fetchData/helpers/usePut";
import useDelete from "fetchData/helpers/useDelete";

const baseURL = "http://localhost:8080/api";

export default function useFetchedCards() {
  const [cards, isGettingCards, reget] = useGet(
    "http://localhost:8080/api/cards/"
  );
  const [deleteMethod] = useDelete();
  const [putMethod, putResult] = usePut();
  const [postMethod, postResults] = usePost();

  const remove = cardId => deleteMethod(`${baseURL}/cards/${cardId}`);
  const update = (cardId, data) =>
    putMethod(`${baseURL}/cards/${cardId}`, data);
  const add = data => {
    console.log({ data });
    postMethod(`${baseURL}/cards/`, data);
  };

  return [cards, { reget, add, update, remove }];
}
