import { useState } from "react";
import useLinks, { makeLink } from "./useLinks";

// sidebar object contains two child objects links and lables which are
// produced by uselink object.

function useLinksAndLabels() {
  const [labels, labelsHandlers] = useLinks();
  const [links, linksHandlers] = useLinks(makeInitLinks());
  const [open, setOpen] = useState(true);
  const onToggle = () => setOpen(!open);
  const makeOnClick = field => ({ id }) => {
    switch (field) {
      case useLinksAndLabels.fields.labels:
        labelsHandlers.click({ id });
        linksHandlers.unclick();
        break;

      case useLinksAndLabels.fields.links:
        labelsHandlers.unclick();
        linksHandlers.click({ id });
        break;

      default:
        throw new Error(`Unhandlable field: ${field}`);
    }
  };

  return [
    { sidebar: { open, labels, links }, labels, card: { labels } },
    {
      header: { onToggle },
      sidebar: {
        makeOnClick,
        labelsHandlers
      },
      labels: labelsHandlers,
      card: {
        add: labelsHandlers.add,
        addCard: labelsHandlers.addCard,
        removeCard: labelsHandlers.removeCard
      }
    }
  ];
}

useLinksAndLabels.fields = {
  labels: "labels",
  links: "links"
};

export default useLinksAndLabels;

function makeInitLinks() {
  const initLinks = [
    { text: "home", to: "/home" },
    { text: "remider", to: "remider" },
    { text: "edit labels", to: "/edit labels" },
    { text: "trash", to: "/trash" }
  ];

  return initLinks.map(link => makeLink(link));
}
