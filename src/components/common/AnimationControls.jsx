import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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
  setChargeOrigin,
  toggleSideMenu,
  incrementIntervalCount,
  setFrequency,
  reset,
} from '../../actions';
import {
  APPLICATION_TIMER_INTERVAL,
  DEFAULT_FREQUENCY,
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

const AnimationControls = ({ sliderFrequency, setSliderFrequency }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { stageDimensions } = useSelector(({ layout }) => layout);
  const { isPaused } = useSelector(({ lab }) => lab);
  const dispatch = useDispatch();
  const theme = useTheme();
  const applicationInterval = useRef();

  const startInterval = () => {
    applicationInterval.current = setInterval(() => {
      dispatch(incrementIntervalCount());
    }, APPLICATION_TIMER_INTERVAL);
  };

  useEffect(() => {
    if (isPaused) {
      clearInterval(applicationInterval.current);
    } else if (!isPaused) {
      startInterval();
    }
  }, [isPaused]);

  const onClickPlay = () => {
    dispatch(setFrequency(sliderFrequency));
    dispatch(togglePause(false));
  };

  const onClickPause = () => {
    dispatch(togglePause(true));
  };

  const onClickReset = () => {
    dispatch(reset());
    dispatch(
      setChargeOrigin({
        x: stageDimensions.width / 2,
        y: stageDimensions.height / 2,
      }),
    );
    setSliderFrequency(DEFAULT_FREQUENCY);
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

AnimationControls.propTypes = {
  sliderFrequency: PropTypes.number.isRequired,
  setSliderFrequency: PropTypes.func.isRequired,
};

export default AnimationControls;
