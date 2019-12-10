import React from "react";
import cx from "classnames";
import styles from "./Button.module.css";

export default function Button(props) {
  const {
    children,
    className,
    onClick,
    ariaLabel,
    tabIndex,
    hoverBackground = false
  } = props;
  const [hover, setHover] = React.useState(false);
  return (
    <div
      role="button"
      className={cx(className, styles.Button, {
        [styles.ButtonHover]: hover,
        [styles.ButtonHoverBackground]: hover && hoverBackground
      })}
      onClick={onClick}
      aria-label={ariaLabel}
      tab-index={tabIndex}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </div>
  );
}
