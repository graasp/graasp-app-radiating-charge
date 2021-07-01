import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import {
  DEFAULT_AMPLITUDE,
  MIN_AMPLITUDE,
  MAX_AMPLITUDE,
  AMPLITUDE_STEP,
  PAUSED_STRING,
  PLAYING_STRING,
} from '../../config/constants';
import { postAction } from '../../actions';
import { DECREASED_AMPLITUDE, INCREASED_AMPLITUDE } from '../../config/verbs';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0),
  },
  unit: {
    marginLeft: theme.spacing(1),
  },
  button: {
    borderRadius: '50%',
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
  superscript: { fontSize: '0.6em' },
}));

const AmplitudeSlider = ({ dispatchSetAmplitude }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPaused = useSelector(({ lab }) => lab.isPaused);
  const { t } = useTranslation();
  const [amplitude, setAmplitude] = useState(DEFAULT_AMPLITUDE);
  const applicationState = isPaused ? PAUSED_STRING : PLAYING_STRING;

  // callback used in the + ('increase') IconButton (slider doesn't natively come with such a button)
  const increaseAmplitude = () => {
    setAmplitude((prevValue) => {
      const newAmplitude = Math.min(prevValue + AMPLITUDE_STEP, MAX_AMPLITUDE);
      dispatch(
        postAction({
          verb: INCREASED_AMPLITUDE,
          data: { newAmplitude, applicationState },
        }),
      );
      return newAmplitude;
    });
  };

  // callback used in the - ('decrease') IconButton (slider doesn't natively come with such a button)
  const decreaseAmplitude = () => {
    setAmplitude((prevValue) => {
      const newAmplitude = Math.max(prevValue - AMPLITUDE_STEP, MIN_AMPLITUDE);
      dispatch(
        postAction({
          verb: DECREASED_AMPLITUDE,
          data: { newAmplitude, applicationState },
        }),
      );
      return newAmplitude;
    });
  };

  // callback used in slider's default onChange handler
  const adjustAmplitude = (event, newValue) => {
    if (newValue > amplitude) {
      dispatch(
        postAction({
          verb: INCREASED_AMPLITUDE,
          data: { newAmplitude: newValue, applicationState },
        }),
      );
    } else if (newValue < amplitude) {
      dispatch(
        postAction({
          verb: DECREASED_AMPLITUDE,
          data: { newAmplitude: newValue, applicationState },
        }),
      );
    }
    setAmplitude(newValue);
  };

  useEffect(() => {
    dispatchSetAmplitude(amplitude);
  }, [amplitude]);

  return (
    <div className={classes.container}>
      <div className={classes.typographyContainer}>
        <Typography variant="body2">{t('Amplitude')}</Typography>
      </div>
      <div className={classes.sliderContainer}>
        <IconButton onClick={decreaseAmplitude}>
          <RemoveCircleOutlineIcon color="secondary" />
        </IconButton>
        <Slider
          onChange={adjustAmplitude}
          aria-labelledby={t('Amplitude')}
          step={AMPLITUDE_STEP}
          min={MIN_AMPLITUDE}
          max={MAX_AMPLITUDE}
          value={amplitude}
        />
        <IconButton onClick={increaseAmplitude}>
          <AddCircleOutlineIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

AmplitudeSlider.propTypes = {
  dispatchSetAmplitude: PropTypes.func.isRequired,
};

export default AmplitudeSlider;
