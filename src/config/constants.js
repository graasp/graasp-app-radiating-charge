export const SET_INTERVAL_TIME = 10;

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
export const DEFAULT_AMPLITUDE = 100;
export const MIN_AMPLITUDE = 0;
export const MAX_AMPLITUDE = 200;
export const AMPLITUDE_STEP = 10;
export const DEFAULT_NUMBER_OF_LINES = 8;
export const MIN_NUMBER_OF_LINES = 2;
export const MAX_NUMBER_OF_LINES = 20;
export const NUMBER_OF_LINES_STEP = 2;
export const DEFAULT_TENSION = 0.1;
export const LINE_STEP_SIZE = 5;
export const DEFAULT_FREQUENCY = 0.5;
export const MIN_FREQUENCY = 0;
export const MAX_FREQUENCY = 1;
export const FREQUENCY_STEP = 0.1;
export const FREQUENCY_RESIDUAL_ERROR_FACTOR = 0.01;

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
