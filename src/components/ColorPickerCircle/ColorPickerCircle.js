import React from "react";
import styles from "./ColorPickerCircle.module.css";
import cx from "classnames";

export default class Circle extends React.Component {
  state = {
    hovered: false
  };
  handleMouseEnter = () => {
    this.setState({ hoverd: true });
  };
  handleMouseLeave = () => {
    this.setState({ hoverd: false });
  };
  render() {
    const { hoverd } = this.state;
    const { fill, selected, colorName, onClick } = this.props;
    return (
      <div
        className={cx(styles.container, styles[`${colorName}`])}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{
          borderColor: `${fill}`,
          border: `2px solid ${hoverd ? "rgba(0,0,0,0.87)" : "#e8eaed"}`
        }}
      >
        <svg
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
        >
          <path className={styles[`${colorName}`]} d="m0 0h18v18h-18z" />
          <path
            display={selected ? "" : "none"}
            fill="rgba(0,0,0,0.4)"
            d="m6.61 11.89l-3.11-3.11-1.06 1.06 4.17 4.16 8.95-8.95-1.06-1.05z"
          />
        </svg>
      </div>
    );
  }
}
