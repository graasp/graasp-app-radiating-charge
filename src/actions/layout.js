import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  SET_AMPLITUDE,
  TOGGLE_OSCILLATION,
  SET_NUMBER_OF_LINES,
  ADJUST_FREQUENCY,
} from '../types';

const toggleSettings = (showSettings) => (dispatch) =>
  dispatch({
    type: TOGGLE_SETTINGS,
    payload: showSettings,
  });

const toggleLoadingScreen = (showLoadingScreen) => (dispatch) =>
  dispatch({
    type: TOGGLE_LOADING_SCREEN,
    payload: showLoadingScreen,
  });

const toggleSideMenu = (showSideMenu) => (dispatch) =>
  dispatch({
    type: TOGGLE_SIDE_MENU,
    payload: showSideMenu,
  });

const toggleOscillation = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_OSCILLATION,
    payload,
  });
};

const setAmplitude = (payload) => (dispatch) => {
  dispatch({
    type: SET_AMPLITUDE,
    payload,
  });
};

const setNumberOfLines = (payload) => (dispatch) => {
  dispatch({
    type: SET_NUMBER_OF_LINES,
    payload,
  });
};

const setFrequency = (payload) => (dispatch) => {
  dispatch({
    type: ADJUST_FREQUENCY,
    payload,
  });
};

export {
  toggleSettings,
  toggleLoadingScreen,
  toggleSideMenu,
  toggleOscillation,
  setAmplitude,
  setNumberOfLines,
  setFrequency,
};
