import { useState, useEffect } from "react";

export default function useGet(query) {
  const [results, setResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  let loading = false;
  let regetCount = 0;
  const reget = () => {
    regetCount += 1;
  };
  useEffect(() => {
    async function getCards() {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      loading = true;
      try {
        const response = await fetch(query, {
          method: "GET",
          mode: "cors",
          credentials: "include"
        });
        const json = await response.json();
        setResults(json);
      } catch (err) {
        console.error({ err });
      } finally {
        loading = false;
      }
    }
    getCards();
  }, [query, regetCount]);
  return { results, loading, reget };
}
