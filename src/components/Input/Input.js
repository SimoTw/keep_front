import React from "react";
import cx from "classnames";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const { className } = props;
  return <input className={cx(className, styles.input)} ref={ref} />;
});

export default Input;
