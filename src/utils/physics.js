import {
  SPEED_OF_LIGHT_IN_METERS_PER_SECOND,
  ONE_NANOMETER_IN_METERS,
  FREQUENCY_UNITS,
  FREQUENCY_CONVERSION_FACTOR,
} from '../config/constants';

// equation to calculate position of y based on sinusoidal oscillation (y(t) = A * sin(2 * PI * freq * t))
export const calculateYPositionHarmonically = (
  frequency,
  amplitude,
  timeInMilliseconds,
) => {
  const MILLISECONDS_PER_SECOND = 1000;
  const timeInSeconds = timeInMilliseconds / MILLISECONDS_PER_SECOND;
  return amplitude * Math.sin(2 * Math.PI * frequency * timeInSeconds);
};

export const calculateWavelength = (frequency) => {
  // if frequency === 0, amplitude is infinity
  if (frequency === 0) {
    return Infinity;
  }
  const wavelength =
    SPEED_OF_LIGHT_IN_METERS_PER_SECOND /
    (frequency *
      FREQUENCY_CONVERSION_FACTOR *
      FREQUENCY_UNITS *
      ONE_NANOMETER_IN_METERS);
  return wavelength;
};

export const calculateDiagonalLength = (width, height) => {
  return Math.sqrt(width ** 2 + height ** 2);
};
