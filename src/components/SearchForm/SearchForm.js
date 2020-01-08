import React from "react";
import cx from "classnames";
import { ReactComponent as Search } from "statics/svgs/search.svg";
import { ReactComponent as Close } from "statics/svgs/close.svg";
import Button from "components/Button/Button";
import styles from "./SearchForm.module.css";
import useSearch from "useReducers/useSearch";

export default function SearchForm({ className }) {
  const [{ text }, { reset, submit, makeOnChange }] = useSearch();
  const onSubmit = e => {
    e.preventDefault();
    submit();
  };
  return (
    <div className={styles.search_outer_container}>
      <form
        className={cx(styles.search_inner_container, className)}
        onSubmit={onSubmit}
      >
        <Button onClick={submit}>
          <Search />
        </Button>
        <input
          id="search"
          type="text"
          placeholder="Search"
          className={styles.search_input}
          onChange={makeOnChange("text")}
          value={text}
        />
        <Button>
          <Close onClick={reset} />
        </Button>
      </form>
    </div>
  );
}
