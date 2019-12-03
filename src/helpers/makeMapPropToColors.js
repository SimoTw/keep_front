import colorNames from "types/colorNames";

export default function makeColorClassNames(styles, containerName = "", color) {
  return colorNames.reduce(
    (acc, colorName) => ({
      ...acc,
      [styles[`${containerName}__${colorName}`]]: color === colorName
    }),
    {}
  );
}
