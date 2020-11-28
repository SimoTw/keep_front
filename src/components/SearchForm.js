import React from "react"
import { ReactComponent as Search } from "statics/svgs/search.svg"
import { ReactComponent as Close } from "statics/svgs/close.svg"
import Button from "components/Button"
import styles from "./SearchForm.module.css"

export default function SearchForm({
  className,
  search: { text },
  searchHandlers: { reset, submit, makeOnChange },
}) {
  const onSubmit = (e) => {
    e.preventDefault()
    submit()
  }
  return (
    <div className={styles.search_outer_container}>
      <form className={styles.search_inner_container} onSubmit={onSubmit}>
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
  )
}
