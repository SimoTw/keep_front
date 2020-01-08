import React from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Menu } from "statics/svgs/menu.svg";
import Button from "components/Button/Button";
import SearchForm from "components/SearchForm/SearchForm";
import { style } from "@material-ui/system";

const Header = ({ children, toggleSidebar, ...props }) => {
  const location = useLocation();
  const pathList = location.pathname.split("/");
  const pathName = pathList[pathList.length - 1];

  return (
    <header className={styles.header} {...props}>
      <Button onClick={toggleSidebar} hoverBackground={true} size="xl">
        <Menu />
      </Button>
      <div className={styles.logo_container}>{pathName}</div>
      <SearchForm className={style.searchFormContainer} />
    </header>
  );
};

export default Header;
