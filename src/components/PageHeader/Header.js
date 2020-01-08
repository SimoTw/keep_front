import React from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as Menu } from "./node_modules/statics/svgs/menu.svg";
import Button from "./node_modules/components/Button/Button";
import SearchForm from "./node_modules/components/SearchForm";
import { style } from "@material-ui/system";

const Header = ({
  children,
  search,
  searchHandlers,
  toggleSidebar,
  ...props
}) => {
  const location = useLocation();
  const pathList = location.pathname.split("/");
  const pathName = pathList[pathList.length - 1];

  return (
    <header className={styles.header} {...props}>
      <Button onClick={toggleSidebar} hoverBackground={true} size="xl">
        <Menu />
      </Button>
      <div className={styles.logo_container}>{pathName}</div>
      <SearchForm
        className={style.searchFormContainer}
        search={search}
        searchHandlers={searchHandlers}
      />
    </header>
  );
};

export default Header;
