import React from "react";
import cx from "classnames";
import styles from "./Sidebar.module.css";
import SidebarList from "components/SidebarList";
import SidebarListButton from "components/SidebarListButton";

// const Links = [
//   /**
//    *  id: number paimary key
//    *  svg: svg|undefined
//    *  text: string
//    *  to: string of path
//    *  */

//   [
//     { to: "/", text: "Home" },
//     { to: "/page1", text: "page1" }
//   ],
//   [
//     { to: "/", text: "Home" },
//     { to: "/page1", text: "page1" }
//   ]
// ];

// function renderLinks(links) {
//   return links.map((subLinks, index) => {
//     if (!Array.isArray(subLinks)) {
//       throw new Error("only support array of list");
//     }
//     return (
//       <SidebarList key={index}>
//         {subLinks.map(({ id, ...linkData }) => (
//           <SidebarListButton
//             key={id}
//             {...linkData}
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//           />
//         ))}
//       </SidebarList>
//     );
//   });
// }

const Sidebar = ({ sidebarState, sidebarHandlers }) => {
  console.log("sidebarState", sidebarState);
  const { mouseEnterLink, mouseLeaveLink, clickLink } = sidebarHandlers;
  return (
    <div
      className={cx(styles.sidebar, {
        [styles.sidebar__close]: !sidebarState.open,
        [styles.sidebar__open]: sidebarState.open
      })}
    >
      <SidebarList>
        {sidebarState.links.map(({ id, hover, select, text, to }) => (
          <SidebarListButton
            key={id}
            id={id}
            hover={hover}
            select={select}
            text={text}
            to={to}
            onMouseEnter={mouseEnterLink}
            onMouseLeave={mouseLeaveLink}
            onClick={clickLink}
          />
        ))}
      </SidebarList>
    </div>
  );
};

export default Sidebar;
