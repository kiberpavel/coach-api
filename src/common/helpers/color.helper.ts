export const generateColor = () => {
  const colorHex = Array.from({ length: 6 }).reduce(
    (colorCode) => `${colorCode}${Math.floor(Math.random() * 16).toString(16)}`,
    '',
  );

  return `#${colorHex}`;
};
