import {
  DEFAULT_AMPLITUDE_VALUE,
  DEFAULT_NUMBER_OF_LINES,
  FREQUENCY_ADJUSTMENT_FACTOR_DEFAULT,
} from '../config/constants';
import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  TOGGLE_OSCILLATION,
  SET_AMPLITUDE,
  SET_NUMBER_OF_LINES,
  ADJUST_FREQUENCY,
} from '../types';

const INITIAL_STATE = {
  settings: {
    open: false,
  },
  showLoader: true,
  showSideMenu: true,
  lab: {
    oscillation: false,
    amplitude: DEFAULT_AMPLITUDE_VALUE,
    numberOfLines: DEFAULT_NUMBER_OF_LINES,
    frequencyAdjustmentFactor: FREQUENCY_ADJUSTMENT_FACTOR_DEFAULT,
  },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          open: payload,
        },
      };
    case TOGGLE_LOADING_SCREEN:
      return {
        ...state,
        showLoader: payload,
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        showSideMenu: payload,
      };
    case TOGGLE_OSCILLATION:
      return {
        ...state,
        lab: {
          ...state.lab,
          oscillation: payload,
        },
      };
    case SET_AMPLITUDE:
      return {
        ...state,
        lab: {
          ...state.lab,
          amplitude: payload,
        },
      };
    case SET_NUMBER_OF_LINES:
      return {
        ...state,
        lab: {
          ...state.lab,
          numberOfLines: payload,
        },
      };
    case ADJUST_FREQUENCY: {
      return {
        ...state,
        lab: {
          ...state.lab,
          frequencyAdjustmentFactor: payload,
        },
      };
    }
    default:
      return state;
  }
};
