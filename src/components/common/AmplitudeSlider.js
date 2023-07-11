import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import { setAmplitude } from '../../actions';
import {
  MIN_AMPLITUDE,
  MAX_AMPLITUDE,
  AMPLITUDE_STEP,
} from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0),
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '60%',
  },
  typographyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
}));

const AmplitudeSlider = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { amplitude } = useSelector(({ lab }) => lab);

  const increaseAmplitude = () => {
    const newAmplitude = Math.min(amplitude + AMPLITUDE_STEP, MAX_AMPLITUDE);
    dispatch(setAmplitude(newAmplitude));
  };

  const decreaseAmplitude = () => {
    const newAmplitude = Math.max(amplitude - AMPLITUDE_STEP, MIN_AMPLITUDE);
    dispatch(setAmplitude(newAmplitude));
  };

  const adjustAmplitude = (event, newValue) => {
    dispatch(setAmplitude(newValue));
  };

  return (
    <div className={classes.container}>
      <div className={classes.typographyContainer}>
        <Typography variant="body2">{t('Amplitude')}</Typography>
      </div>
      <div className={classes.sliderContainer}>
        <IconButton
          onClick={decreaseAmplitude}
          disabled={amplitude <= MIN_AMPLITUDE}
        >
          <RemoveCircleOutlineIcon
            color={amplitude > MIN_AMPLITUDE ? 'secondary' : 'disabled'}
          />
        </IconButton>
        <Slider
          onChange={adjustAmplitude}
          aria-labelledby={t('Amplitude')}
          step={AMPLITUDE_STEP}
          min={MIN_AMPLITUDE}
          max={MAX_AMPLITUDE}
          value={amplitude}
        />
        <IconButton
          onClick={increaseAmplitude}
          disabled={amplitude >= MAX_AMPLITUDE}
        >
          <AddCircleOutlineIcon
            color={amplitude < MAX_AMPLITUDE ? 'primary' : 'disabled'}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default AmplitudeSlider;
