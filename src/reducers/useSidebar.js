import { useReducer } from "react";

function sidebarReducer(state, action) {
  switch (action.type) {
    case "open": {
      return { ...state, open: false };
    }
    case "close": {
      return { ...state, open: true };
    }
    case "toggle": {
      return { ...state, open: !state.open };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useSidebar() {
  const [state, dispatch] = useReducer(sidebarReducer, { open: false });

  const toggle = () => dispatch({ type: useSidebar.types.toggle });
  const setOpen = () => dispatch({ type: useSidebar.types.open });
  const setClose = () => dispatch({ type: useSidebar.types.close });

  return [state, { toggle, setOpen, setClose }];
}

useSidebar.types = {
  toggle: "toggle",
  open: "open",
  close: "close"
};

export default useSidebar;
