import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {
  DEFAULT_FREQUENCY,
  MIN_FREQUENCY,
  MAX_FREQUENCY,
  FREQUENCY_MARKS,
  FREQUENCY_CONVERSION_FACTOR,
  PAUSED_STRING,
  PLAYING_STRING,
} from '../../config/constants';
import { postAction } from '../../actions';
import { DECREASED_FREQUENCY, INCREASED_FREQUENCY } from '../../config/verbs';

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
  unit: {
    marginLeft: theme.spacing(1),
  },
  superscript: { fontSize: '0.6em' },
}));

const FrequencySlider = ({ dispatchSetFrequency }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPaused = useSelector(({ lab }) => lab.isPaused);
  const { t } = useTranslation();
  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);
  const applicationState = isPaused ? PAUSED_STRING : PLAYING_STRING;

  // callback used in the + ('increase') IconButton (slider doesn't natively come with such a button)
  const increaseFrequency = () => {
    setFrequency((prevValue) => {
      const newFrequency =
        prevValue === MAX_FREQUENCY
          ? prevValue
          : FREQUENCY_MARKS[FREQUENCY_MARKS.indexOf(prevValue) + 1];
      dispatch(
        postAction({
          verb: INCREASED_FREQUENCY,
          data: {
            newFrequency: `${newFrequency.toFixed(1)} x 10^14 Hz`,
            applicationState,
          },
        }),
      );
      return newFrequency;
    });
  };

  // callback used in the - ('decrease') IconButton (slider doesn't natively come with such a button)
  const decreaseFrequency = () => {
    setFrequency((prevValue) => {
      const newFrequency =
        prevValue === MIN_FREQUENCY
          ? prevValue
          : FREQUENCY_MARKS[FREQUENCY_MARKS.indexOf(prevValue) - 1];
      dispatch(
        postAction({
          verb: DECREASED_FREQUENCY,
          data: {
            newFrequency: `${newFrequency.toFixed(1)} x 10^14 Hz`,
            applicationState,
          },
        }),
      );
      return newFrequency;
    });
  };

  // callback used in slider's default onChange handler
  const adjustFrequency = (event, newValue) => {
    if (newValue > frequency) {
      dispatch(
        postAction({
          verb: INCREASED_FREQUENCY,
          data: {
            newFrequency: `${newValue.toFixed(1)} x 10^14 Hz`,
            applicationState,
          },
        }),
      );
    } else if (newValue < frequency) {
      dispatch(
        postAction({
          verb: DECREASED_FREQUENCY,
          data: {
            newFrequency: `${newValue.toFixed(1)} x 10^14 Hz`,
            applicationState,
          },
        }),
      );
    }
    setFrequency(newValue);
  };

  // note: frequency / conversion_factor is dispatched so that stated frequencies generate expected wavelengths
  useEffect(() => {
    dispatchSetFrequency(frequency / FREQUENCY_CONVERSION_FACTOR);
  }, [frequency]);

  return (
    <div className={classes.container}>
      <div className={classes.typographyContainer}>
        <Typography variant="body2">{t('Frequency')}</Typography>
        <Typography variant="body2" className={classes.unit}>
          {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
          {'(10'}
          <sup className={classes.superscript}>14</sup>
          {t(' Hz)')}
        </Typography>
      </div>
      <div className={classes.sliderContainer}>
        <IconButton onClick={decreaseFrequency}>
          <RemoveCircleOutlineIcon color="secondary" />
        </IconButton>
        <Slider
          onChange={adjustFrequency}
          aria-labelledby={t('Frequency')}
          step={null}
          // component expects marks to be of the format [{value: X},...]
          marks={FREQUENCY_MARKS.map((freq) => ({ value: freq }))}
          min={MIN_FREQUENCY}
          max={MAX_FREQUENCY}
          valueLabelDisplay="on"
          value={frequency}
        />
        <IconButton onClick={increaseFrequency}>
          <AddCircleOutlineIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

FrequencySlider.propTypes = {
  dispatchSetFrequency: PropTypes.func.isRequired,
};

export default FrequencySlider;
