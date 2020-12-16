import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  SET_AMPLITUDE,
  TOGGLE_GRID_LINES,
  TOGGLE_MEASURING_ARROW,
  TOGGLE_OSCILLATION,
  TOGGLE_PAUSE,
  SET_NUMBER_OF_LINES,
  SET_FREQUENCY,
  SET_STAGE_DIMENSIONS,
  SET_MEASURING_ARROW_WIDTH,
  SET_CHARGE_ORIGIN,
  SET_CHARGE_OSCILLATION,
  SET_TIMER_COUNT,
  SET_ELAPSED_TIME,
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

const toggleGridLines = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_GRID_LINES,
    payload,
  });
};

const toggleMeasuringArrow = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_MEASURING_ARROW,
    payload,
  });
};

const toggleOscillation = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_OSCILLATION,
    payload,
  });
};

const togglePause = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_PAUSE,
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

const setMeasuringArrowWidth = (payload) => (dispatch) => {
  dispatch({ type: SET_MEASURING_ARROW_WIDTH, payload });
};

const setFrequency = (payload) => (dispatch) => {
  dispatch({
    type: SET_FREQUENCY,
    payload,
  });
};

const setStageDimensions = (payload) => (dispatch) => {
  dispatch({
    type: SET_STAGE_DIMENSIONS,
    payload,
  });
};

const setChargeOrigin = (payload) => (dispatch) => {
  dispatch({
    type: SET_CHARGE_ORIGIN,
    payload,
  });
};

const setChargeOscillation = (payload) => (dispatch) => {
  dispatch({
    type: SET_CHARGE_OSCILLATION,
    payload,
  });
};

const setTimerCount = (payload) => (dispatch) => {
  dispatch({
    type: SET_TIMER_COUNT,
    payload,
  });
};

const setElapsedTime = (payload) => (dispatch) => {
  dispatch({
    type: SET_ELAPSED_TIME,
    payload,
  });
};

export {
  toggleSettings,
  toggleLoadingScreen,
  toggleSideMenu,
  toggleGridLines,
  toggleMeasuringArrow,
  toggleOscillation,
  togglePause,
  setAmplitude,
  setNumberOfLines,
  setFrequency,
  setMeasuringArrowWidth,
  setStageDimensions,
  setChargeOrigin,
  setChargeOscillation,
  setTimerCount,
  setElapsedTime,
};
