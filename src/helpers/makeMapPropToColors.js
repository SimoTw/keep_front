import colorNames from "types/colorNames";

export default function makeColorClassNames(styles, containerName = "", color) {
  return colorNames.reduce(
    (acc, colorName) => ({
      ...acc,
      [styles[`${containerName}__${colorName}`]]: color === colorName
    }),
    {}
  );
  // return {
  //   container__white: backgroundColor === "white",
  //   container__red: backgroundColor === "red",
  //   container__orange: backgroundColor === "orange",
  //   container__yellow: backgroundColor === "yellow",
  //   container__green: backgroundColor === "green",
  //   container__bluegreen: backgroundColor === "bluegreen",
  //   container__blue: backgroundColor === "blue",
  //   container__deepblue: backgroundColor === "deepblue",
  //   container__purple: backgroundColor === "purple",
  //   container__pink: backgroundColor === "pink",
  //   container__brown: backgroundColor === "brown",
  //   container__gray: backgroundColor === "gray"
  // };
}
