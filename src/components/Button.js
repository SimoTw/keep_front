import React from "react";
import styles from "./Button.module.css";

export default function Button(props) {
  const { children, className, onClick, ariaLabel, tabIndex } = props;
  return (
    <div
      role="button"
      className={`${className} ${styles.Button}`}
      onClick={onClick}
      aria-label={ariaLabel}
      tab-index={tabIndex}
    >
      {children}
    </div>
  );
}
