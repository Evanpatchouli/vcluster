export const themeVarsLocked = [
  "textButtonHoverColor",
  "scrollBarThumbBackgroundColor",
];

export const ThemeVarLabel = (
  strings: TemplateStringsArray,
  name: string,
  locked: boolean
) => {
  if (!locked) {
    return name;
  } else {
    return `${name} unChangeable`;
  }
};
