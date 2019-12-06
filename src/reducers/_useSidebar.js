import { useReducer } from "react";

let count = 0;
const makeLink = ({ text }) => ({
  id: count++,
  text,
  cluster: 1,
  to: `/${text}`,
  hover: false,
  select: false
});

function sidebarReducer(state, action) {
  const isValidText = text => {
    const checkList = list => {
      for (let i = 0; i < list.length; i++) {
        let obj = list[i];
        if (obj.text === text) return false;
      }
      return true;
    };
    return checkList(state.links) && checkList(state.tags);
  };
  const changeLinkField = (field, changeList) => {
    if (field === "links" || field === "tags") {
      return {
        ...state,
        [field]: changeList(state[field])
      };
    } else {
      throw new Error(`Unhandlable field: ${field}`);
    }
  };
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
      const { text = "", field } = action;
      if (!isValidText(text))
        throw new Error(`Can change to exist text: ${text}`);
      const changeList = list => [...list, makeLink({ text })];
      return changeLinkField(field, changeList);
    }
    case "delete": {
      const { id, field } = action;
      const changeList = list => list.filter(link => link.id !== id);
      return changeLinkField(field, changeList);
    }
    case "update": {
      const { id, field, payload } = action;
      // field type should be like : "tags/text"
      let fields = field.split("/");
      if (field === "text" && !isValidText(payload)) return state;
      const changeList = list =>
        list.map(link =>
          link.id === id ? { ...link, [fields[1]]: payload } : link
        );
      return changeLinkField(fields[0], changeList);
    }

    case "mouseEnter": {
      const { id, field } = action;
      const changeList = list =>
        list.map(link => (link.id === id ? { ...link, hover: true } : link));
      return changeLinkField(field, changeList);
    }
    case "mouseLeave": {
      const { id, field } = action;
      const changeList = list =>
        list.map(link => (link.id === id ? { ...link, hover: false } : link));
      return changeLinkField(field, changeList);
    }
    case "click": {
      const { id, field } = action;
      const changeList = list =>
        list.map(link =>
          link.id === id
            ? { ...link, select: true }
            : { ...link, select: false }
        );
      if (field === "tags" || field === "links") {
        return {
          ...state,
          links: changeList(state.links),
          tags: changeList(state.tags)
        };
      } else {
        throw new Error(`Unhandlable field: ${field}`);
      }
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function getInitState() {
  const tags = [];
  for (let i = 0; i < 20; i++) {
    tags.push(makeLink({ text: `page${i}` }));
  }
  return {
    // sidebar is expand or close
    open: true,
    // path is "/" or not
    // atRoot: true,
    //  links: [[link]]
    links: [
      makeLink({ text: "home" }),
      makeLink({ text: "remider" }),
      makeLink({ text: "edit tags" }),
      makeLink({ text: "trash" })
    ],
    tags
  };
}

function useSidebar() {
  const [state, dispatch] = useReducer(sidebarReducer, getInitState());

  const toggle = () => dispatch({ type: useSidebar.types.toggle });
  const setOpen = () => dispatch({ type: useSidebar.types.open });
  const setClose = () => dispatch({ type: useSidebar.types.close });
  const addLink = ({ text, field }) =>
    dispatch({ type: useSidebar.types.add, text, field });
  const deleteLink = ({ id, field }) =>
    dispatch({ type: useSidebar.types.delete, id, field });
  const updateLink = ({ id, field, payload }) =>
    dispatch({
      type: useSidebar.types.update,
      id,
      field,
      payload
    });
  const mouseEnterLink = ({ id, field }) =>
    dispatch({ type: useSidebar.types.mouseEnter, id, field });
  const mouseLeaveLink = ({ id, field }) =>
    dispatch({ type: useSidebar.types.mouseLeave, id, field });
  const clickLink = ({ id, to, field }) =>
    dispatch({ type: useSidebar.types.click, id, to, field });

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