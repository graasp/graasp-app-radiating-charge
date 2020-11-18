import {
  TOGGLE_SETTINGS,
  TOGGLE_LOADING_SCREEN,
  TOGGLE_SIDE_MENU,
  SET_AMPLITUDE,
  TOGGLE_STOP,
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

const toggleStop = (payload) => (dispatch) => {
  dispatch({
    type: TOGGLE_STOP,
    payload,
  });
};

const setAmplitude = (payload) => (dispatch) => {
  dispatch({
    type: SET_AMPLITUDE,
    payload,
  });
};

export {
  toggleSettings,
  toggleLoadingScreen,
  toggleSideMenu,
  toggleStop,
  setAmplitude,
};
