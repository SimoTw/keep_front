import { useState } from "react";

export default function usePost() {
  const [results, setResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  let loading = false;
  async function postMethod(query, data) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loading = true;
    try {
      const response = await fetch(query, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      const json = await response.json();
      setResults(json);
    } catch (err) {
      console.log({ err });
    } finally {
      loading = false;
    }
  }

  return { postMethod, results, loading };
}
