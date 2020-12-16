import {
  DEFAULT_AMPLITUDE,
  DEFAULT_NUMBER_OF_LINES,
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
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  TOGGLE_GRID_LINES,
  TOGGLE_MEASURING_ARROW,
  TOGGLE_OSCILLATION,
  TOGGLE_PAUSE,
  SET_AMPLITUDE,
  SET_NUMBER_OF_LINES,
  SET_FREQUENCY,
  SET_MEASURING_ARROW_WIDTH,
  SET_STAGE_DIMENSIONS,
  SET_CHARGE_ORIGIN,
  SET_CHARGE_OSCILLATION,
  SET_TIMER_COUNT,
  SET_ELAPSED_TIME,
} from '../types';

const INITIAL_STATE = {
  settings: {
    open: false,
  },
  showLoader: true,
  showSideMenu: true,
  lab: {
    stageDimensions: { width: 0, height: 0 },
    oscillation: false,
    gridLines: true,
    measuringArrow: false,
    measuringArrowWidth: DEFAULT_MEASURING_ARROW_WIDTH,
    amplitude: DEFAULT_AMPLITUDE,
    numberOfLines: DEFAULT_NUMBER_OF_LINES,
    frequency: DEFAULT_FREQUENCY,
    isPaused: false,
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
    case TOGGLE_GRID_LINES:
      return {
        ...state,
        lab: {
          ...state.lab,
          gridLines: payload,
        },
      };
    case TOGGLE_MEASURING_ARROW:
      return {
        ...state,
        lab: { ...state.lab, measuringArrow: payload },
      };
    case TOGGLE_OSCILLATION:
      return {
        ...state,
        lab: {
          ...state.lab,
          oscillation: payload,
        },
      };
    case TOGGLE_PAUSE:
      return { ...state, lab: { ...state.lab, isPaused: payload } };
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
    case SET_FREQUENCY: {
      return {
        ...state,
        lab: {
          ...state.lab,
          frequency: payload,
        },
      };
    }
    case SET_STAGE_DIMENSIONS: {
      return { ...state, lab: { ...state.lab, stageDimensions: payload } };
    }
    case SET_CHARGE_ORIGIN: {
      return {
        ...state,
        lab: {
          ...state.lab,
          chargeOrigin: payload,
        },
      };
    }
    case SET_MEASURING_ARROW_WIDTH: {
      return { ...state, lab: { ...state.lab, measuringArrowWidth: payload } };
    }
    case SET_CHARGE_OSCILLATION: {
      return {
        ...state,
        lab: {
          ...state.lab,
          chargeOscillation: payload,
        },
      };
    }
    case SET_TIMER_COUNT: {
      return {
        ...state,
        lab: {
          ...state.lab,
          timerCount: payload,
        },
      };
    }
    case SET_ELAPSED_TIME: {
      return {
        ...state,
        lab: {
          ...state.lab,
          elapsedTime: payload,
        },
      };
    }
    default:
      return state;
  }
};
