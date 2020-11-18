import { DEFAULT_AMPLITUDE_VALUE } from '../config/constants';
import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  TOGGLE_STOP,
  SET_AMPLITUDE,
} from '../types';

const INITIAL_STATE = {
  settings: {
    open: false,
  },
  showLoader: true,
  showSideMenu: true,
  lab: {
    stop: false,
    amplitude: DEFAULT_AMPLITUDE_VALUE,
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
    case TOGGLE_STOP:
      return {
        ...state,
        lab: {
          ...state.lab,
          stop: payload,
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
    default:
      return state;
  }
};
