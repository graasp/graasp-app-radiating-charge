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
import { togglePause } from '../../actions';

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
  const dispatch = useDispatch();

  const onClickButton = () => {
    dispatch(togglePause(!isPaused));
  };

  return (
    <div>
      {!isPaused && (
        <Tooltip title={t('Pause')}>
          <IconButton onClick={onClickButton}>
            <PauseCircleOutlineIcon className={classes.pauseButton} />
          </IconButton>
        </Tooltip>
      )}
      {isPaused && (
        <Tooltip title={t('Play')}>
          <IconButton onClick={onClickButton}>
            <PlayCircleOutlineIcon className={classes.playButton} />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={t('Reset')}>
        <IconButton>
          <RotateLeftIcon className={classes.resetButton} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AnimationControls;
