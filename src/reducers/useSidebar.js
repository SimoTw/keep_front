import { useReducer } from "react";

function sidebarReducer(state, action) {
  const makeLink = ({ id, text }) => ({
    id,
    text,
    cluster: 1,
    to: `/${text}`,
    hover: false,
    select: false
  });
  console.log("action", action);

  switch (action.type) {
    // sidebar actions
    case "open": {
      return { ...state, open: false };
    }
    case "close": {
      return { ...state, open: true };
    }
    case "toggle": {
      return { ...state, open: !state.open };
    }
    // link actions
    case "add": {
      const { id, text } = action;
      return {
        ...state,
        links: [...state.links, makeLink(id, text)]
      };
    }
    case "delete": {
      const { id } = action;
      return {
        ...state,
        links: state.links.filter(link => link.id !== id)
      };
    }
    case "update": {
      const { id, text } = action;
      return {
        ...state,
        links: state.links.map(link =>
          link.id === id ? { ...link, text, to: `/${action.text}` } : link
        )
      };
    }

    case "mouseEnter": {
      const { id } = action;
      return {
        ...state,
        links: state.links.map(link =>
          link.id === id ? { ...link, hover: true } : link
        )
      };
    }
    case "mouseLeave": {
      const { id } = action;
      return {
        ...state,
        links: state.links.map(link =>
          link.id === id ? { ...link, hover: false } : link
        )
      };
    }
    case "click": {
      const { id, to } = action;
      return {
        ...state,
        atRoot: to === "/" ? true : false,
        links: state.links.map(link =>
          link.id === id
            ? { ...link, select: true }
            : { ...link, select: false }
        )
      };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function getInitState() {
  return {
    // sidebar is expand or close
    open: true,
    // path is "/" or not
    atRoot: true,
    //  links: [[link]]
    links: [
      {
        id: "0",
        cluster: 0,
        to: "/home",
        text: "home",
        hover: false,
        select: false
      }
    ]
  };
}

function useSidebar() {
  const [state, dispatch] = useReducer(sidebarReducer, getInitState());

  const toggle = () => dispatch({ type: useSidebar.types.toggle });
  const setOpen = () => dispatch({ type: useSidebar.types.open });
  const setClose = () => dispatch({ type: useSidebar.types.close });
  const addLink = ({ id, text }) =>
    dispatch({ type: useSidebar.types.add, id, text });
  const deleteLink = ({ id }) =>
    dispatch({ type: useSidebar.types.delete, id });
  const updateLink = ({ id, text }) =>
    dispatch({ type: useSidebar.types.update, id, text });
  const mouseEnterLink = ({ id }) =>
    dispatch({ type: useSidebar.types.mouseEnter, id });
  const mouseLeaveLink = ({ id }) =>
    dispatch({ type: useSidebar.types.mouseLeave, id });
  const clickLink = ({ id, to }) =>
    dispatch({ type: useSidebar.types.click, id, to });

  return [
    state,
    // handlers
    {
      toggle,
      setOpen,
      setClose,
      addLink,
      deleteLink,
      updateLink,
      mouseEnterLink,
      mouseLeaveLink,
      clickLink
    }
  ];
}

useSidebar.types = {
  // sidebar methods
  toggle: "toggle",
  open: "open",
  close: "close",
  // link method
  add: "add",
  delete: "delete",
  update: "update",
  mouseEnter: "mouseEnter",
  mouseLeave: "mouseLeave",
  click: "click"
};

export default useSidebar;
