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
export const MEASURING_ARROW_TEXT_FONT_SIZE = 16;
// every 47.5 pixels === 100nm
// this constant is only used in the text display above the arrow
export const MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR = 100 / 47.5;

// spectrum bar constants
// note: infrared range: 1000-700nm; visible light: 700-400nm; ultraviolet: 400-100nm
export const INFRARED_BAR_WIDTH = MEASURING_ARROW_STEP * 3;
export const VISIBLE_LIGHT_BAR_WIDTH = MEASURING_ARROW_STEP * 3;
export const ULTRAVIOLET_BAR_WIDTH = MEASURING_ARROW_STEP * 3;
export const TOTAL_SPECTRUM_BAR_WIDTH =
  INFRARED_BAR_WIDTH + VISIBLE_LIGHT_BAR_WIDTH + ULTRAVIOLET_BAR_WIDTH;
export const SPECTRUM_BAR_HEIGHT = 50;
export const SPECTRUM_BAR_STROKE_COLOR = 'black';
export const SPECTRUM_BAR_STROKE_WIDTH = 0.5;
// css gradient, values from 0 to 1
export const INFRARED_COLOR_RANGE = [0, 'darkred', 1, 'red'];
export const VISIBLE_LIGHT_COLOR_RANGE = [
  0,
  'red',
  1 / 6,
  'orange',
  2 / 6,
  'yellow',
  3 / 6,
  'green',
  4 / 6,
  'blue',
  5 / 6,
  'indigo',
  1,
  'violet',
];
export const ULTRAVIOLET_COLOR_RANGE = [0, 'violet', 1, 'white'];
export const SPECTRUM_BAR_LABELS_FONT_SIZE = 16;
export const INFRARED_BAR_LABEL_COLOR = 'white';
export const ULTRAVIOLET_BAR_LABEL_COLOR = 'black';
export const WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR = 10;
export const WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR = 5;

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
