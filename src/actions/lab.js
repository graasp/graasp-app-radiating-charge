import {
  SET_AMPLITUDE,
  TOGGLE_GRID_LINES,
  TOGGLE_MEASURING_ARROW,
  TOGGLE_OSCILLATION,
  TOGGLE_PAUSE,
  TOGGLE_SPECTRUM_BAR,
  SET_NUMBER_OF_LINES,
  SET_FREQUENCY,
  SET_MEASURING_ARROW_WIDTH,
  SET_CHARGE_ORIGIN,
  SET_CHARGE_OSCILLATION,
  SET_TIMER_COUNT,
  SET_ELAPSED_TIME,
} from '../types';

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

const toggleSpectrumBar = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_SPECTRUM_BAR,
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
  toggleGridLines,
  toggleMeasuringArrow,
  toggleOscillation,
  togglePause,
  toggleSpectrumBar,
  setAmplitude,
  setNumberOfLines,
  setFrequency,
  setMeasuringArrowWidth,
  setChargeOrigin,
  setChargeOscillation,
  setTimerCount,
  setElapsedTime,
};
