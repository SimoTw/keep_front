import React from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Menu } from "statics/svgs/menu.svg";
import Button from "components/Button";
import SearchForm from "components/SearchForm";

const Header = ({
  children,
  sidebarState,
  sidebarHandlers,
  search,
  searchHandlers,
  ...props
}) => {
  const location = useLocation();
  const pathList = location.pathname.split("/");
  const pathName = pathList[pathList.length - 1];

  return (
    <header className={styles.header} {...props}>
      <Button onClick={sidebarHandlers.onToggle}>
        <Menu />
      </Button>
      <div className={styles.logo_container}>{pathName}</div>
      <SearchForm search={search} searchHandlers={searchHandlers} />
    </header>
  );
};

export default Header;
