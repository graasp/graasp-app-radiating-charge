import {
  SPEED_OF_LIGHT_IN_METERS_PER_SECOND,
  ONE_NANOMETER_IN_METERS,
  FREQUENCY_UNITS,
  INTERVAL_ADJUSTMENT_FACTOR,
  LINE_STEP_SIZE,
} from '../config/constants';

export const calculateChargeY = (frequency, amplitude, intervalCount) => {
  const adjustedIntervalCount = intervalCount / INTERVAL_ADJUSTMENT_FACTOR;
  return amplitude * Math.sin(2 * Math.PI * frequency * adjustedIntervalCount);
};

export const calculateWavelength = (frequency) => {
  // if frequency === 0, amplitude is infinity
  if (frequency === 0) {
    return Infinity;
  }
  const wavelength =
    SPEED_OF_LIGHT_IN_METERS_PER_SECOND /
    (frequency * FREQUENCY_UNITS * ONE_NANOMETER_IN_METERS);
  return wavelength;
};

const calculateDiagonal = (base, height) => {
  return Math.sqrt(base ** 2 + height ** 2);
};

const generateStraightLinePoints = (angle, diagonal) => {
  const points = [];
  for (let i = 0; i <= Math.ceil(diagonal / LINE_STEP_SIZE); i += 1) {
    points.push(i * Math.cos(angle) * LINE_STEP_SIZE);
    points.push(i * Math.sin(angle) * LINE_STEP_SIZE);
  }
  return points;
};

export const generateOscillationCurve = (
  intervalCount,
  angle,
  frequency,
  amplitude,
  stageWidth,
  stageHeight,
) => {
  const diagonal = calculateDiagonal(stageWidth / 2, stageHeight / 2);
  const upperLimit = Math.min(
    intervalCount,
    Math.ceil(diagonal / LINE_STEP_SIZE),
  );

  const straightLinePoints = generateStraightLinePoints(angle, diagonal);

  if (intervalCount === 0) {
    return straightLinePoints;
  }

  const points = [];
  for (let i = 0; i < upperLimit; i += 1) {
    points.push(i * Math.cos(angle) * LINE_STEP_SIZE);
    points.push(
      calculateChargeY(frequency, amplitude, intervalCount - i) +
        i * Math.sin(angle) * LINE_STEP_SIZE,
    );
  }

  return [
    ...points,
    ...straightLinePoints.slice(straightLinePoints.length - 2),
  ];
};
