import { useState } from "react";

export default function usePut(handleRes = () => {}) {
  const [results, setResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  let loading = false;
  async function putMethod(query, data) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loading = true;
    try {
      const response = await fetch(query, {
        method: "PUT",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
          "Access-Control-Request-Method": "PUT",
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();
      setResults(json);
      handleRes(json);
    } catch (err) {
      console.log({ err });
    } finally {
      loading = false;
    }
  }

  return { putMethod, results, loading };
}
