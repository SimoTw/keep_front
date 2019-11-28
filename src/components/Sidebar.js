import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ sidebarState }) => {
  return (
    <div className={sidebarState.open ? styles.sidebar : styles.sidebar__close}>
      side
    </div>
  );
};

export default Sidebar;
