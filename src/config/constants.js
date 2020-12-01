export const SET_INTERVAL_TIME = 50;

export const DRAWER_WIDTH = 430;
export const DEFAULT_THEME_DIRECTION = 'rtl';
export const FORM_CONTROL_MIN_WIDTH = 120;
export const LOGO_SIZE = '48px';
export const DEFAULT_HEADER_VISIBLE = true;
export const MAXIMUM_Z_INDEX = 999999;

export const CHARGE_RADIUS = 10;
export const CHARGE_COLOR = 'red';
export const CHARGE_SYMBOL = '+';
export const CHARGE_SYMBOL_FONT_SIZE = 20;
export const CHARGE_SYMBOL_COLOR = 'white';
export const BACKGROUND_COLOR = 'lightgrey';
export const STROKE_COLOR = 'black';

export const MAX_POINTS_FOR_LINES = 300;
export const DEFAULT_AMPLITUDE_VALUE = 100;
export const MAX_AMPLITUDE_VALUE = 250;
export const DEFAULT_NUMBER_OF_LINES = 8;
export const MIN_NUMBER_OF_LINES = 2;
export const MAX_NUMBER_OF_LINES = 20;
export const NUMBER_OF_LINES_STEP = 2;
export const DEFAULT_TENSION = 0.1;
export const LINE_STEP_SIZE = 5;
export const FREQUENCY_ADJUSTMENT_FACTOR_DEFAULT = 0.25;
export const FREQUENCY_ADJUSTMENT_FACTOR_MIN = 0;
export const FREQUENCY_ADJUSTMENT_FACTOR_MAX = 0.5;
export const FREQUENCY_ADJUSTMENT_FACTOR_STEP = 0.05;

export const DOWNWARDS_DIRECTION = 'downwards';
export const UPWARDS_DIRECTION = 'upwards';

// numOfLines should be >= 2
export const generateAngles = (numOfLines) => {
  const firstQuadrantAngles = new Array(numOfLines / 2)
    .fill()
    .map(
      (emptyElement, index) => (Math.PI / 2 / (numOfLines / 2)) * (index + 1),
    );

  // generating angles for remaining quadrants is easy: just add 90deg (PI / 2) to each angle in previous quadrant
  const secondQuadrantAngles = firstQuadrantAngles.map(
    (angle) => angle + Math.PI / 2,
  );

  const thirdQuadrantAngles = secondQuadrantAngles.map(
    (angle) => angle + Math.PI / 2,
  );

  const fourthQuadrantAngles = thirdQuadrantAngles.map(
    (angle) => angle + Math.PI / 2,
  );

  return [
    ...firstQuadrantAngles,
    ...secondQuadrantAngles,
    ...thirdQuadrantAngles,
    ...fourthQuadrantAngles,
  ];
};
