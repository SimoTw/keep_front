import React from "react";
import cx from "classnames";
import styles from "./Sidebar.module.css";
import SidebarList from "components/SidebarList";
import SidebarListButton from "components/SidebarListButton";

const Sidebar = ({ sidebarState, sidebarHandlers }) => {
  const { links, labels } = sidebarState;
  const { makeOnClick, makeOnMouseEnter, makeOnMouseLeave } = sidebarHandlers;
  const renderList = (list, field) => {
    return (
      <>
        {list.map(({ id, hover, select, text, to }) => (
          <SidebarListButton
            key={id}
            id={id}
            field={field}
            hover={hover}
            select={select}
            text={text}
            to={to}
            onMouseEnter={makeOnMouseEnter(field)}
            onMouseLeave={makeOnMouseLeave(field)}
            onClick={makeOnClick(field)}
          />
        ))}
      </>
    );
  };
  return (
    <div
      className={cx(styles.sidebar, {
        [styles.sidebar__close]: !sidebarState.sidebar.open,
        [styles.sidebar__open]: sidebarState.sidebar.open
      })}
    >
      <SidebarList>{renderList(links.slice(0, 2), "links")}</SidebarList>
      <SidebarList>
        {renderList(labels, "labels")}
        {renderList(links.slice(2, 3), "links")}
      </SidebarList>
      <SidebarList>
        {renderList(links.slice(3, links.length), "links")}
      </SidebarList>
    </div>
  );
};

export default Sidebar;
