import React from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Menu } from "statics/svgs/menu.svg";
import Button from "components/Button";
import SearchForm from "components/SearchForm";

const Header = ({ children, sidebarState, sidebarHandlers, ...props }) => {
  const location = useLocation();
  const pathName = location.pathname.slice(1);
  return (
    <header className={styles.header} {...props}>
      <Button onClick={sidebarHandlers.onToggle}>
        <Menu />
      </Button>
      <div className={styles.logo_container}>{pathName}</div>
      <SearchForm />
    </header>
  );
};

export default Header;
