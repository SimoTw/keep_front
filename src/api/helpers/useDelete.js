import { useState } from "react"

export default function useDelete() {
  const [results, setResults] = useState([])
  // const [loading, setLoading] = useState(false);
  let loading = false
  async function deleteMethod(query) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loading = true
    try {
      const response = await fetch(query, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Access-Control-Request-Method": "DELETE",
          "Content-Type": "application/json",
        },
      })
      const json = await response.json()
      setResults(json)
    } catch (err) {
      console.log({ err })
    } finally {
      loading = false
    }
  }

  return { results, deleteMethod, loading }
}

// export default function useDelete() {
//   const [results, setResults] = useState([]);
//   // const [loading, setLoading] = useState(false);
//   let loading = false;
//   async function deleteMethod(query) {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     loading = true;
//     try {
//       const response = await fetch(query, {
//         method: "DELETE",
//         mode: "cors",
//         credentials: "include"
//       });
//       const json = await response.json();
//       setResults(json);
//     } catch (err) {
//       console.log({ err });
//     } finally {
//       loading = false;
//     }
//   }

//   return { results, deleteMethod, loading };
// }
