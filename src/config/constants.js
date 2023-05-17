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
export const DEFAULT_TENSION = 0.1;
export const LINE_STEP_SIZE = 5;

// frequency constants

// ***** frequencies generate wavelengths as per wavelength (nm) = speed of light (nm/s) / frequency (1/s) *****
// therefore we expect [frequency, wavelength] pairs of...
// [[30 (x10^14), 100], [20, 150], [15, 200], [12, 250], ...]
// this factor converts the stated frequencies in the application to an oscillation frequency that generates the expected wavelength
// it is a (very good) approximation (not derived programatically)
export const FREQUENCY_CONVERSION_FACTOR = 3;

export const DEFAULT_FREQUENCY = 3.0 / FREQUENCY_CONVERSION_FACTOR;
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

export const DEFAULT_CHARGE_X_POSITION = 0;
export const DEFAULT_CHARGE_Y_POSITION = 0;
export const DEFAULT_CHARGE_OSCILLATION_X_POSITION = 0;
export const DEFAULT_CHARGE_OSCILLATION_Y_POSITION = 0;
export const DEFAULT_TIMER_COUNT = 1;
export const DEFAULT_ELAPSED_TIME = 0;

// grid constants
export const GRID_AXES_COLOR = '#000';
export const GRID_AXES_STROKE_WIDTH = 0.5;
export const GRID_LEGEND_LABEL_TEXT = '100nm';
export const GRID_SCALE_FONT_SIZE = 14;
export const GRID_SCALE_TEXT_WIDTH = 48;
export const SCALE_STROKE_MARGIN = 2;

// measuring arrow constants
export const MEASURING_ARROW_POINTER_LENGTH = 5;
export const MEASURING_ARROW_POINTER_WIDTH = 5;
export const MEASURING_ARROW_STROKE_WIDTH = 3;
export const MEASURING_ARROW_STROKE_COLOR = 'darkgreen';
export const DEFAULT_MEASURING_ARROW_WIDTH = 47.5;
export const MIN_MEASURING_ARROW_WIDTH = 23.75;
export const MAX_MEASURING_ARROW_WIDTH = 237.5;
export const MEASURING_ARROW_STEP = 11.875;
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
export const TOTAL_SPECTRUM_BAR_WIDTH = MEASURING_ARROW_STEP * 36;
export const SPECTRUM_BAR_HEIGHT = 50;
// css gradient, values from 0 to 1
export const INFRARED_COLOR_RANGE = [0, 'red', 0.1, 'black'];
export const VISIBLE_LIGHT_COLOR_RANGE = [
  0,
  'violet',
  1 / 6,
  'indigo',
  2 / 6,
  'blue',
  3 / 6,
  'green',
  4 / 6,
  'yellow',
  5 / 6,
  'orange',
  1,
  'red',
];
export const ULTRAVIOLET_COLOR_RANGE = [0, 'black', 0.9, 'black', 1, 'violet'];
export const SPECTRUM_BAR_LABELS_FONT_SIZE = 16;
export const SPECTRUM_BAR_LABEL_COLOR = 'white';
export const SPECTRUM_BAR_Y = 0.85;
export const MAIN_LABEL_PADDING = 0.05;
export const BOTTOM_LABEL_PADDING = 0.075;
export const BOTTOM_LABEL_INDENT = 5;

// spectrum bar marker constants
export const MARKER_FILL = 'white';
export const MARKER_BORDER = 'red';
export const MARKER_STROKE_WIDTH = 1;
export const MARKER_POINTER_WIDTH = 16;
export const MARKER_POINTER_HEIGHT = 8;

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
export const LEFT_STRING = 'left';
export const RIGHT_STRING = 'right';
export const MIDDLE_STRING = 'middle';
export const CENTER_STRING = 'center';
