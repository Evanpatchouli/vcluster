export const themeVarsLocked = [
  "textButtonHoverColor",
  "scrollBarThumbBackgroundColor",
];

export const ThemeVarLabel = (
  strings: TemplateStringsArray,
  name: string,
  editable: boolean
) => {
  if (editable) {
    return name;
  } else {
    return `${name} unChangeable`;
  }
};
