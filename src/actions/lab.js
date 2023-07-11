import {
  SET_AMPLITUDE,
  TOGGLE_GRID_LINES,
  TOGGLE_MEASURING_ARROW,
  TOGGLE_PAUSE,
  TOGGLE_SPECTRUM_BAR,
  SET_FREQUENCY,
  SET_MEASURING_ARROW_WIDTH,
  SET_CHARGE_ORIGIN,
  INCREMENT_INTERVAL_COUNT,
  RESET,
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

const incrementIntervalCount = () => (dispatch) =>
  dispatch({ type: INCREMENT_INTERVAL_COUNT });

const reset = () => (dispatch) => dispatch({ type: RESET });

export {
  toggleGridLines,
  toggleMeasuringArrow,
  togglePause,
  toggleSpectrumBar,
  setAmplitude,
  setFrequency,
  setMeasuringArrowWidth,
  setChargeOrigin,
  incrementIntervalCount,
  reset,
};
