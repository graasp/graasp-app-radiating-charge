import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import StopIcon from '@material-ui/icons/Stop';
import Tooltip from '@material-ui/core/Tooltip';
import { green, orange, blue, yellow } from '@material-ui/core/colors';
import clsx from 'clsx';
import {
  togglePause,
  toggleOscillation,
  toggleMeasuringArrow,
  toggleSpectrumBar,
  setChargeOrigin,
  setChargeOscillation,
  setTimerCount,
  setElapsedTime,
} from '../../actions';
import {
  DEFAULT_CHARGE_OSCILLATION_X_POSITION,
  DEFAULT_CHARGE_OSCILLATION_Y_POSITION,
  DEFAULT_TIMER_COUNT,
  DEFAULT_ELAPSED_TIME,
} from '../../config/constants';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    fontSize: '1.75em',
  },
  pauseButton: {
    color: yellow[800],
  },
  playButton: { color: green[800] },
  stopButton: { color: blue[900] },
  resetButton: { color: orange[800] },
}));

const AnimationControls = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isPaused = useSelector(({ layout }) => layout.lab.isPaused);
  const stageDimensions = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const dispatch = useDispatch();

  const onClickPlay = () => {
    dispatch(togglePause(false));
    dispatch(toggleOscillation(true));
  };

  const onClickPause = () => {
    dispatch(togglePause(true));
    dispatch(toggleOscillation(false));
  };

  const onClickStop = () => {
    dispatch(setTimerCount(DEFAULT_TIMER_COUNT));
    dispatch(setElapsedTime(DEFAULT_ELAPSED_TIME));
    dispatch(toggleOscillation(false));
    dispatch(togglePause(true));
  };

  const onClickReset = () => {
    dispatch(
      setChargeOrigin({
        x: stageDimensions.width / 2,
        y: stageDimensions.height / 2,
      }),
    );
    dispatch(
      setChargeOscillation({
        x: DEFAULT_CHARGE_OSCILLATION_X_POSITION,
        y: DEFAULT_CHARGE_OSCILLATION_Y_POSITION,
      }),
    );
    dispatch(setTimerCount(DEFAULT_TIMER_COUNT));
    dispatch(setElapsedTime(DEFAULT_ELAPSED_TIME));
    dispatch(toggleOscillation(false));
    dispatch(togglePause(true));
    dispatch(toggleMeasuringArrow(false));
    dispatch(toggleSpectrumBar(false));
  };

  return (
    <div className={classes.buttonContainer}>
      {!isPaused && (
        <Tooltip title={t('Pause')} placement="left">
          <IconButton onClick={onClickPause}>
            <PauseCircleOutlineIcon
              className={clsx(classes.button, classes.pauseButton)}
            />
          </IconButton>
        </Tooltip>
      )}
      {isPaused && (
        <Tooltip title={t('Play')} placement="left">
          <IconButton onClick={onClickPlay}>
            <PlayCircleOutlineIcon
              className={clsx(classes.button, classes.playButton)}
            />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={t('Stop')} placement="top">
        <IconButton disabled={isPaused} onClick={onClickStop}>
          <StopIcon
            className={clsx(classes.button, {
              [classes.stopButton]: !isPaused,
            })}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('Reset')} placement="right">
        <IconButton onClick={onClickReset}>
          <RotateLeftIcon
            className={clsx(classes.button, classes.resetButton)}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AnimationControls;
