import { useEffect } from "react";

export default function useOuterPageEffect(containerRef, onClick) {
  // containerRef for the outer div, to check whether clicked element in the container subtree or not
  // coClick event will triggered while clicked event target not contain in the container's subtree
  return useEffect(() => {
    const onPageClick = e => {
      if (
        containerRef &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        onClick(e);
      }
    };
    window.addEventListener("click", onPageClick);
    return () => window.removeEventListener("click", onPageClick);
  }, [containerRef, onClick]);
}
