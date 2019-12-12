import React from "react";
import colorNames from "types/colorNames";
import styles from "./ColorPicker.module.css";
import Circle from "components/Circle";

export default class ColorPicker extends React.Component {
  state = {
    selectedColor: ""
  };
  makeOnClick = colorName => () => {
    const { cardHandlers, cardId } = this.props;
    this.setState({ selectedColor: colorName });
    cardHandlers.onChange({
      id: cardId,
      field: "backgroundColor",
      payload: colorName
    });
  };
  render() {
    // const { selectedColor } = this.state;
    const { backgroundColor: selectedColor } = this.props;
    return (
      <div className={styles.container}>
        {colorNames.map((colorName, index) => (
          <div key={colorName}>
            <Circle
              selected={selectedColor === colorName}
              colorName={colorName}
              onClick={this.makeOnClick(colorName)}
            />
          </div>
        ))}
      </div>
    );
  }
}
