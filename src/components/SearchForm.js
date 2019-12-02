import React from "react";
import { ReactComponent as Search } from "statics/svgs/search.svg";
import { ReactComponent as Close } from "statics/svgs/close.svg";
import Button from "components/Button";
import styles from "./SearchForm.module.css";

export default function SearchForm() {
  return (
    <div className={styles.search_outer_container}>
      <form className={styles.search_inner_container}>
        <Button>
          <Search />
        </Button>
        <input id="search" className={styles.search_input} />
        <Button>
          <Close />
        </Button>
      </form>
    </div>
  );
}
