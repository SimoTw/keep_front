import { useReducer } from "react";

let count = 0;
const makeLink = ({ text, to }) => ({
  id: count++,
  text,
  to,
  hover: false,
  select: false
});

function linkReducer(state, action) {
  //   const isValidText = text => {
  //     const checkList = list => {
  //       for (let i = 0; i < list.length; i++) {
  //         let obj = list[i];
  //         if (obj.text === text) return false;
  //       }
  //       return true;
  //     };
  //     return checkList(state);
  //   };

  switch (action.type) {
    // link actions
    case useLinks.types.add: {
      const { text, to } = action;
      return [...state, makeLink({ text, to })];
    }
    case useLinks.types.remove: {
      const { id } = action;
      return state.filter(link => link.id !== id);
    }
    case useLinks.types.update: {
      const { id, field, payload } = action;

      return state.map(link =>
        link.id === id ? { ...link, [field]: payload } : link
      );
    }

    case useLinks.types.mouseEnter: {
      const { id } = action;
      return state.map(link =>
        link.id === id ? { ...link, hover: true } : link
      );
    }
    case useLinks.types.mouseLeave: {
      const { id } = action;
      return state.map(link =>
        link.id === id ? { ...link, hover: false } : link
      );
    }
    case useLinks.types.click: {
      const { id } = action;
      return state.map(link =>
        link.id === id ? { ...link, select: true } : { ...link, select: false }
      );
    }
    case useLinks.types.unclick: {
      return state.map(link => ({ ...link, select: false }));
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useLinks() {
  const [state, dispatch] = useReducer(linkReducer, []);
  const add = ({ text, to }) =>
    dispatch({ type: useLinks.types.add, text, to });
  const remove = ({ id }) => dispatch({ type: useLinks.types.remove, id });
  const update = ({ id, field, payload }) =>
    dispatch({
      type: useLinks.types.update,
      id,
      field,
      payload
    });
  const mouseEnter = ({ id }) =>
    dispatch({ type: useLinks.types.mouseEnter, id });
  const mouseLeave = ({ id }) =>
    dispatch({ type: useLinks.types.mouseLeave, id });
  const click = ({ id }) => dispatch({ type: useLinks.types.click, id });
  const unclick = () => dispatch({ type: useLinks.types.unclick });

  console.log("state", state);

  return [
    state,
    { add, remove, update, mouseEnter, mouseLeave, click, unclick }
  ];
}

useLinks.types = {
  add: "add",
  remove: "remove",
  update: "update",
  mouseEnter: "mouseEnter",
  mouseLeave: "mouseLeave",
  click: "click",
  unclick: "unclick"
};

// function getInitState() {
//   const tags = [];
//   for (let i = 0; i < 20; i++) {
//     tags.push(makeLink({ text: `page${i}` }));
//   }
//   return [
//     makeLink({ text: "home", to: "/home" }),
//     makeLink({ text: "remider", to: "remider" }),
//     makeLink({ text: "edit tags", to: "/edit tags" }),
//     makeLink({ text: "trash", to: "/trasg" })
//   ];
// }

export default useLinks;
