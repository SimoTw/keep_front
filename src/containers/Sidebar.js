import React from "react";
import cx from "classnames";
import styles from "./Sidebar.module.css";
import SidebarList from "components/SidebarList";
import SidebarListButton from "components/SidebarListButton";

const Sidebar = ({ sidebarState, sidebarHandlers }) => {
  const { links, tags } = sidebarState;
  const { mouseEnterLink, mouseLeaveLink, clickLink } = sidebarHandlers;
  const renderList = (list, field) => {
    return (
      <SidebarList>
        {list.map(({ id, hover, select, text, to }) => (
          <SidebarListButton
            key={id}
            id={id}
            field={field}
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
    );
  };
  return (
    <div
      className={cx(styles.sidebar, {
        [styles.sidebar__close]: !sidebarState.open,
        [styles.sidebar__open]: sidebarState.open
      })}
    >
      {renderList(links, "links")}
      {renderList(tags, "tags")}
    </div>
  );
};

export default Sidebar;
