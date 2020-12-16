import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Tooltip from '@material-ui/core/Tooltip';
import { green, red, yellow } from '@material-ui/core/colors';
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
  pauseButton: {
    color: yellow[800],
  },
  playButton: { color: green[800] },
  resetButton: { color: red[800] },
}));

const AnimationControls = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isPaused = useSelector(({ layout }) => layout.lab.isPaused);
  const stageDimensions = useSelector(
    ({ layout }) => layout.lab.stageDimensions,
  );
  const dispatch = useDispatch();

  const onClickPauseOrPlay = () => {
    dispatch(togglePause(!isPaused));
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
    dispatch(togglePause(false));
    dispatch(toggleMeasuringArrow(false));
    dispatch(toggleSpectrumBar(false));
  };

  return (
    <div>
      {!isPaused && (
        <Tooltip title={t('Pause')}>
          <IconButton onClick={onClickPauseOrPlay}>
            <PauseCircleOutlineIcon className={classes.pauseButton} />
          </IconButton>
        </Tooltip>
      )}
      {isPaused && (
        <Tooltip title={t('Play')}>
          <IconButton onClick={onClickPauseOrPlay}>
            <PlayCircleOutlineIcon className={classes.playButton} />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={t('Reset')}>
        <IconButton onClick={onClickReset}>
          <RotateLeftIcon className={classes.resetButton} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AnimationControls;
