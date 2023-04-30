import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import { green, orange, yellow } from '@material-ui/core/colors';
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
  toggleSideMenu,
} from '../../actions';
import {
  DEFAULT_CHARGE_OSCILLATION_X_POSITION,
  DEFAULT_CHARGE_OSCILLATION_Y_POSITION,
  DEFAULT_TIMER_COUNT,
  DEFAULT_ELAPSED_TIME,
  DEFAULT_THEME_DIRECTION,
} from '../../config/constants';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  sideContainer: {
    width: '10%',
    display: 'flex',
    alignItems: 'center',
  },
  centerContainer: {
    width: '80%',
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
  resetButton: { color: orange[800] },
}));

const AnimationControls = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { stageDimensions } = useSelector(({ layout }) => layout);
  const { isPaused } = useSelector(({ lab }) => lab);
  const dispatch = useDispatch();
  const theme = useTheme();

  const onClickPlay = () => {
    dispatch(togglePause(false));
    dispatch(toggleOscillation(true));
  };

  const onClickPause = () => {
    dispatch(togglePause(true));
    dispatch(toggleOscillation(false));
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
      <div className={classes.sideContainer}>
        <Tooltip title={t('Close side menu')} placement="right">
          <IconButton onClick={() => dispatch(toggleSideMenu(false))}>
            {theme.direction === DEFAULT_THEME_DIRECTION ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.centerContainer}>
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
        <Tooltip title={t('Reset')} placement="right">
          <IconButton onClick={onClickReset}>
            <RotateLeftIcon
              className={clsx(classes.button, classes.resetButton)}
            />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.sideContainer} />
    </div>
  );
};

export default AnimationControls;
