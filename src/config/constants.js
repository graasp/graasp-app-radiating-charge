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
export const DEFAULT_AMPLITUDE = 20;
export const MIN_AMPLITUDE = 0;
export const MAX_AMPLITUDE = 40;
export const AMPLITUDE_STEP = 5;
export const DEFAULT_NUMBER_OF_LINES = 6;
export const MIN_NUMBER_OF_LINES = 2;
export const MAX_NUMBER_OF_LINES = 20;
export const NUMBER_OF_LINES_STEP = 2;
export const DEFAULT_TENSION = 0.1;
export const LINE_STEP_SIZE = 5;
export const DEFAULT_FREQUENCY = 1.0;
export const MIN_FREQUENCY = 0;
export const MAX_FREQUENCY = 10;
export const FREQUENCY_STEP = 0.25;
// *****IMPORTANT: we were provided with a table matching frequencies to wavelengths*****
// specifically we expect [frequency, wavelength] pairs of...
// [[30, 100], [15, 200], [10, 300], [7.5, 400], [6, 500], [5, 600], [4.29, 700], [3.75, 800], [3.33, 900], [3, 1000]]
// (where frequency is measured in 10^14 Hz and wavelength in nanometers)
// THIS table should be reflected in the application (i.e. in generated wavelengths)
export const FREQUENCY_CONVERSION_FACTOR = 3;

export const DEFAULT_CHARGE_X_POSITION = 0;
export const DEFAULT_CHARGE_Y_POSITION = 0;
export const DEFAULT_CHARGE_OSCILLATION_X_POSITION = 0;
export const DEFAULT_CHARGE_OSCILLATION_Y_POSITION = 0;
export const DEFAULT_TIMER_COUNT = 1;
export const DEFAULT_ELAPSED_TIME = 0;

// grid constants
export const NUM_OF_X_AXIS_TICKS = 20;
export const GRID_AXES_COLOR = '#000';
export const GRID_AXES_STROKE_WIDTH = 0.5;

// measuring arrow constants
export const MEASURING_ARROW_POINTER_LENGTH = 5;
export const MEASURING_ARROW_POINTER_WIDTH = 5;
export const MEASURING_ARROW_STROKE_WIDTH = 3;
export const MEASURING_ARROW_STROKE_COLOR = 'darkgreen';
export const DEFAULT_MEASURING_ARROW_WIDTH = 95;
export const MIN_MEASURING_ARROW_WIDTH = 47.5;
export const MAX_MEASURING_ARROW_WIDTH = 475;
export const MEASURING_ARROW_STEP = 47.5;
// every 47.5 pixels === 100nm
export const MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR = 100 / 47.5;

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
