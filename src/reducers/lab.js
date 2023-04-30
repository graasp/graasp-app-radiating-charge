import {
  DEFAULT_AMPLITUDE,
  DEFAULT_FREQUENCY,
  DEFAULT_CHARGE_X_POSITION,
  DEFAULT_CHARGE_Y_POSITION,
  DEFAULT_CHARGE_OSCILLATION_X_POSITION,
  DEFAULT_CHARGE_OSCILLATION_Y_POSITION,
  DEFAULT_TIMER_COUNT,
  DEFAULT_ELAPSED_TIME,
  DEFAULT_MEASURING_ARROW_WIDTH,
} from '../config/constants';
import {
  TOGGLE_GRID_LINES,
  TOGGLE_MEASURING_ARROW,
  TOGGLE_OSCILLATION,
  TOGGLE_PAUSE,
  TOGGLE_SPECTRUM_BAR,
  SET_AMPLITUDE,
  SET_FREQUENCY,
  SET_MEASURING_ARROW_WIDTH,
  SET_CHARGE_ORIGIN,
  SET_CHARGE_OSCILLATION,
  SET_TIMER_COUNT,
  SET_ELAPSED_TIME,
} from '../types';

const INITIAL_STATE = {
  oscillation: false,
  gridLines: true,
  measuringArrow: false,
  spectrumBar: false,
  measuringArrowWidth: DEFAULT_MEASURING_ARROW_WIDTH,
  amplitude: DEFAULT_AMPLITUDE,
  frequency: DEFAULT_FREQUENCY,
  isPaused: true,
  chargeOrigin: {
    x: DEFAULT_CHARGE_X_POSITION,
    y: DEFAULT_CHARGE_Y_POSITION,
  },
  chargeOscillation: {
    x: DEFAULT_CHARGE_OSCILLATION_X_POSITION,
    y: DEFAULT_CHARGE_OSCILLATION_Y_POSITION,
  },
  timerCount: DEFAULT_TIMER_COUNT,
  elapsedTime: DEFAULT_ELAPSED_TIME,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_GRID_LINES:
      return {
        ...state,
        gridLines: payload,
      };
    case TOGGLE_MEASURING_ARROW:
      return {
        ...state,
        measuringArrow: payload,
      };
    case TOGGLE_OSCILLATION:
      return {
        ...state,
        oscillation: payload,
      };
    case TOGGLE_PAUSE:
      return { ...state, isPaused: payload };
    case TOGGLE_SPECTRUM_BAR:
      return { ...state, spectrumBar: payload };
    case SET_AMPLITUDE:
      return {
        ...state,
        amplitude: payload,
      };
    case SET_FREQUENCY: {
      return {
        ...state,
        frequency: payload,
      };
    }
    case SET_CHARGE_ORIGIN: {
      return {
        ...state,
        chargeOrigin: payload,
      };
    }
    case SET_MEASURING_ARROW_WIDTH: {
      return { ...state, measuringArrowWidth: payload };
    }
    case SET_CHARGE_OSCILLATION: {
      return {
        ...state,
        chargeOscillation: payload,
      };
    }
    case SET_TIMER_COUNT: {
      return {
        ...state,
        timerCount: payload,
      };
    }
    case SET_ELAPSED_TIME: {
      return {
        ...state,
        elapsedTime: payload,
      };
    }
    default:
      return state;
  }
};
