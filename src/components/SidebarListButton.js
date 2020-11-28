import React from "react"
import cx from "classnames"
import styles from "./SidebarListButton.module.css"
import { useHistory } from "react-router-dom"

export default function SidebarButton({
  id = "-1",
  svg,
  select,
  text,
  to = "/",
  onClick = () => {},
}) {
  const history = useHistory()
  const handleClick = () => {
    history.push(to, { labelId: id })
    onClick()
  }

  return (
    <li
      className={cx(styles.listitem, {
        [styles.listitem__selected]: select,
        [styles.listitem__hoverable]: !select,
      })}
      onClick={handleClick}
    >
      {svg && <svg />} <span className={styles.text}>{text}</span>
    </li>
  )
  /*
   * immutable state: svg, text
   * mutable state: hover, hover when it's not at home page, selected
   * methods: click -> select(), cancel()
   */
}
