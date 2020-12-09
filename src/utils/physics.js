// equation to calculate position of y based on sinusoidal oscillation (y(t) = A * sin(2 * PI * freq * t))
// eslint-disable-next-line import/prefer-default-export
export const calculateYpositionHarmonically = (
  frequency,
  amplitude,
  timeInMilliseconds,
) => {
  const timeInSeconds = timeInMilliseconds / 1000;
  return amplitude * Math.sin(2 * Math.PI * frequency * timeInSeconds);
};
