// equation to calculate position of y based on sinusoidal oscillation (y(t) = A * sin(2 * PI * freq * t))
// eslint-disable-next-line import/prefer-default-export
export const calculateYPositionHarmonically = (
  frequency,
  amplitude,
  timeInMilliseconds,
) => {
  const MILLISECONDS_PER_SECOND = 1000;
  const timeInSeconds = timeInMilliseconds / MILLISECONDS_PER_SECOND;
  return amplitude * Math.sin(2 * Math.PI * frequency * timeInSeconds);
};
