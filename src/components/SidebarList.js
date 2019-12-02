import React from "react";
import styles from "./SidebarList.module.css";

export default function SidebarList({ children }) {
  return <ul className={styles.list}>{children}</ul>;
}
