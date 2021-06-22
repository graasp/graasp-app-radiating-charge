export const SET_INTERVAL_TIME = 10;

export const DRAWER_WIDTH = 430;
export const DEFAULT_THEME_DIRECTION = 'rtl';
export const FORM_CONTROL_MIN_WIDTH = 120;
export const LOGO_SIZE = '48px';
export const DEFAULT_HEADER_VISIBLE = false;
export const MAXIMUM_Z_INDEX = 999999;

export const CHARGE_RADIUS = 10;
export const CHARGE_COLOR = 'red';
export const BACKGROUND_COLOR = 'lightgrey';
export const STROKE_COLOR = 'black';

export const CHARGE_SYMBOL_HEIGHT_AND_WIDTH = 10;
export const CHARGE_SYMBOL_STROKE_WIDTH = 1.5;
export const CHARGE_SYMBOL_COLOR = 'white';

export const MAX_POINTS_FOR_LINES = 300;
export const DEFAULT_AMPLITUDE = 20;
export const MIN_AMPLITUDE = 0;
export const MAX_AMPLITUDE = 40;
export const AMPLITUDE_STEP = 5;
export const DEFAULT_NUMBER_OF_LINES = 12;
export const MIN_NUMBER_OF_LINES = 4;
export const MAX_NUMBER_OF_LINES = 40;
export const NUMBER_OF_LINES_STEP = 4;
export const DEFAULT_TENSION = 0.1;
export const LINE_STEP_SIZE = 5;

// frequency constants
export const DEFAULT_FREQUENCY = 3.0;
export const MIN_FREQUENCY = 0;
export const MAX_FREQUENCY = 30;
// unlike amplitude slider, frequency slider takes custom marks, i.e. it doesn't increase/decrease by a fixed step
// this is so that the generated wavelengths are distributed evenly between infrared/visible/ultraviolet ranges
export const FREQUENCY_MARKS = [
  0,
  3,
  3.25,
  3.5,
  3.75,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  8,
  10,
  12,
  15,
  20,
  30,
];
// ***** frequencies generate wavelengths as per wavelength (nm) = speed of light (nm/s) / frequency (1/s) *****
// therefore we expect [frequency, wavelength] pairs of...
// [[30 (x10^14), 100], [20, 150], [15, 200], [12, 250], ...]
// this factor converts the stated frequencies in the application to an oscillation frequency that generates the expected wavelength
// it is a (very good) approximation (not derived programatically)
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
export const DEFAULT_MEASURING_ARROW_WIDTH = 47.5;
export const MIN_MEASURING_ARROW_WIDTH = 23.75;
export const MAX_MEASURING_ARROW_WIDTH = 237.5;
export const MEASURING_ARROW_STEP = 23.75;
export const MEASURING_ARROW_TEXT_FONT_SIZE = 16;
// CharCode 8982 is the crosshair indicating draggability
export const MEASURING_ARROW_SYMBOL_CHAR_CODE = 8982;
// every 23.75 pixels === 100nm
export const MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR = 100 / 23.75;
// used to initially center measuring arrow labels
export const APPROXIMATE_MEASURING_ARROW_TEXT_WIDTH = 49;
export const APPROXIMATE_MEASURING_ARROW_DRAG_ICON_WIDTH = 17.5;

// constants used in utils/physics, to calculate wavelength given frequency
export const SPEED_OF_LIGHT_IN_METERS_PER_SECOND = 3e8;
export const ONE_NANOMETER_IN_METERS = 1e-9;
// frequency is stated in 10^14 HZ
export const FREQUENCY_UNITS = 1e14;
export const MAX_DISPLAYED_WAVELENGTH = 1000;
export const MIN_DISPLAYED_WAVELENGTH = 100;

// spectrum bar constants
// note: infrared range: 1000-700nm; visible light: 700-400nm; ultraviolet: 400-100nm
export const INFRARED_BAR_WIDTH = MEASURING_ARROW_STEP * 6;
export const VISIBLE_LIGHT_BAR_WIDTH = MEASURING_ARROW_STEP * 6;
export const ULTRAVIOLET_BAR_WIDTH = MEASURING_ARROW_STEP * 6;
export const TOTAL_SPECTRUM_BAR_WIDTH =
  INFRARED_BAR_WIDTH + VISIBLE_LIGHT_BAR_WIDTH + ULTRAVIOLET_BAR_WIDTH;
export const SPECTRUM_BAR_HEIGHT = 50;
export const SPECTRUM_BAR_STROKE_COLOR = 'black';
export const SPECTRUM_BAR_STROKE_WIDTH = 0.5;
// css gradient, values from 0 to 1
export const INFRARED_COLOR_RANGE = [0, 'black', 0.9, 'black', 1, 'red'];
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
export const ULTRAVIOLET_COLOR_RANGE = [0, 'violet', 0.1, 'black'];
export const SPECTRUM_BAR_LABELS_FONT_SIZE = 16;
export const INFRARED_BAR_LABEL_COLOR = 'white';
export const ULTRAVIOLET_BAR_LABEL_COLOR = 'white';
export const SPECTRUM_BAR_PADDING = 8;
export const WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR = 10;
export const WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR = 5;
export const APPROXIMATE_WAVELENGTH_LABEL_WIDTH = 120;

// spectrum bar marker constants
export const SPECTRUM_BAR_MARKER_COLOR = 'red';
export const SPECTRUM_BAR_MARKER_TRIANGLE_STROKE_WIDTH = 1;
export const SPECTRUM_BAR_MARKER_LINE_STROKE_WIDTH = 2;
export const SPECTRUM_BAR_MARKER_TRIANGLE_BASE = 16;
export const SPECTRUM_BAR_MARKER_TRIANGLE_HEIGHT = 8;

// numOfLines should be >= 2
export const generateAngles = (numOfLines) => {
  const firstQuadrantAngles = new Array(numOfLines / 4)
    .fill()
    .map(
      (emptyElement, index) => (Math.PI / 2 / (numOfLines / 4)) * (index + 1),
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

// other constants
export const PAUSED_STRING = 'paused';
export const PLAYING_STRING = 'playing';
