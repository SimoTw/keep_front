import { useState } from "react";
import useLinks, { makeLink } from "./useLinks";

// sidebar object contains two child objects links and lables which are
// produced by uselink object.

function useSidebar() {
  const [labels, labelsHandlers] = useLinks();
  const [links, linksHandlers] = useLinks(makeInitLinks());
  const [open, setOpen] = useState(true);
  const onToggle = () => setOpen(!open);
  const makeOnClick = field => ({ id }) => {
    switch (field) {
      case useSidebar.fields.labels:
        labelsHandlers.click({ id });
        linksHandlers.unclick();
        break;

      case useSidebar.fields.links:
        labelsHandlers.unclick();
        linksHandlers.click({ id });
        break;

      default:
        throw new Error(`Unhandlable field: ${field}`);
    }
  };
  const makeOnMouseEnter = field => ({ id }) => {
    switch (field) {
      case useSidebar.fields.labels:
        labelsHandlers.mouseEnter({ id });
        break;

      case useSidebar.fields.links:
        linksHandlers.mouseEnter({ id });
        break;

      default:
        throw new Error(`Unhandlable field: ${field}`);
    }
  };
  const makeOnMouseLeave = field => ({ id }) => {
    switch (field) {
      case useSidebar.fields.labels:
        labelsHandlers.mouseLeave({ id });
        break;

      case useSidebar.fields.links:
        linksHandlers.mouseLeave({ id });
        break;

      default:
        throw new Error(`Unhandlable field: ${field}`);
    }
  };
  return [
    { sidebar: { open }, labels, links },
    {
      header: { onToggle },
      sidebar: { makeOnClick, makeOnMouseEnter, makeOnMouseLeave },
      labels: labelsHandlers,
      links: linksHandlers
    }
  ];
}

useSidebar.fields = {
  labels: "labels",
  links: "links"
};

export default useSidebar;

function makeInitLinks() {
  const initLinks = [
    { text: "home", to: "/home" },
    { text: "remider", to: "remider" },
    { text: "edit labels", to: "/edit labels" },
    { text: "trash", to: "/trash" }
  ];

  return initLinks.map(link => makeLink(link));
}
