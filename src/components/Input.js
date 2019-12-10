import React from "react";
import cx from "classnames";
import styles from "./Input.module.css";

export default function Input({ className, props }) {
  return <input className={cx(className, styles.input)} {...props} />;
}
