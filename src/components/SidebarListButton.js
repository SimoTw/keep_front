import React from "react";
import cx from "classnames";
import styles from "./SidebarListButton.module.css";
import { useHistory } from "react-router-dom";

export default function SidebarButton({
  id = "-1",
  svg,
  select,
  hover,
  text,
  field,
  to = "/",
  onClick,
  onMouseEnter,
  onMouseLeave
}) {
  const history = useHistory();
  const handleClick = () => {
    history.push(to, { labelId: id });
    onClick({ id, to, field });
  };

  const handleMouseEnter = () => {
    onMouseEnter({ id, field });
  };

  const handleMouseLeave = () => {
    onMouseLeave({ id, field });
  };
  return (
    <li
      className={cx(styles.listitem, {
        [styles.listitem__hover]: hover,
        [styles.listitem__selected]: select
      })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {svg && <svg />} <span className={styles.text}>{text}</span>
    </li>
  );
  /*
   * immutable state: svg, text
   * mutable state: hover, hover when it's not at home page, selected
   * methods: click -> select(), cancel()
   */
}
