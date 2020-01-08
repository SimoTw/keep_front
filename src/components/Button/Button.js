import React from "react";
import cx from "classnames";
import styles from "./Button.module.css";

export default function Button({
  size = "l",
  children,
  className,
  onClick,
  ariaLabel,
  tabIndex,
  hoverBackground = false,
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      role="button"
      className={cx(className, styles.Button, {
        [styles.size_xl]: size === "xl",
        [styles.size_l]: size === "l",
        [styles.size_xs]: size === "xs",

        [styles.ButtonHover]: hover,
        [styles.ButtonHoverBackground]: hover && hoverBackground
      })}
      onClick={onClick}
      aria-label={ariaLabel}
      tab-index={tabIndex}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {children}
    </div>
  );
}
