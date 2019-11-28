import React from "react";
import styles from "./Header.module.css";

const Header = ({ children, sidebarState, sidebarHandlers, ...props }) => {
  return (
    <header className={styles.header} {...props}>
      <button onClick={sidebarHandlers.toggle}>
        {sidebarState.open ? "Close" : "Open"}
      </button>
      {children}
    </header>
  );
};

export default Header;
