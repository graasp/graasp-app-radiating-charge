/* eslint-disable import/prefer-default-export */
export const generateMarkerPoints = (
  spectrumBarHeight,
  pointerHeight,
  pointerWidth,
) => {
  const stemHeight = spectrumBarHeight - 2 * pointerHeight;
  const indent = 0.075;
  const stemBeginsX = pointerWidth / 2 + pointerWidth * indent;
  const stemEndsX = pointerWidth / 2 - pointerWidth * indent;

  return [
    0,
    0,
    pointerWidth,
    0,
    stemBeginsX,
    pointerHeight,
    stemBeginsX,
    pointerHeight + stemHeight,
    pointerWidth,
    pointerHeight + stemHeight + pointerHeight,
    0,
    pointerHeight + stemHeight + pointerHeight,
    stemEndsX,
    pointerHeight + stemHeight,
    stemEndsX,
    pointerHeight,
  ];
};
