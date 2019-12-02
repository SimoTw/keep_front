import React from "react";
import styles from "./SidebarListButton.module.css";
import { useHistory } from "react-router-dom";

export default function SidebarButton({ svg, text, to = "/" }) {
  const history = useHistory();
  const onClick = () => {
    history.push(to);
  };
  return (
    <li className={styles.listitem} onClick={onClick}>
      {svg && <svg />} <span className={styles.text}>{text}</span>
    </li>
  );
  /*
   * immutable state: svg, text
   * mutable state: hover, hover when it's not at home page, selected
   * methods: click -> select(), cancel()
   */
}
