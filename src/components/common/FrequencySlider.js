import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {
  MIN_FREQUENCY,
  MAX_FREQUENCY,
  FREQUENCY_MARKS,
} from '../../config/constants';
import { setFrequency } from '../../actions';

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

const FrequencySlider = ({ sliderFrequency, setSliderFrequency }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { frequency, isPaused } = useSelector(({ lab }) => lab);

  const increaseFrequency = () => {
    const newFrequency =
      sliderFrequency === MAX_FREQUENCY
        ? sliderFrequency
        : FREQUENCY_MARKS[FREQUENCY_MARKS.indexOf(sliderFrequency) + 1];
    if (!isPaused) {
      dispatch(setFrequency(newFrequency));
    }
    setSliderFrequency(newFrequency);
  };

  const decreaseFrequency = () => {
    const newFrequency =
      sliderFrequency === MIN_FREQUENCY
        ? sliderFrequency
        : FREQUENCY_MARKS[FREQUENCY_MARKS.indexOf(sliderFrequency) - 1];
    if (!isPaused) {
      dispatch(setFrequency(newFrequency));
    }
    setSliderFrequency(newFrequency);
  };

  const adjustFrequency = (event, newFrequency) => {
    if (!isPaused) {
      dispatch(setFrequency(newFrequency));
    }
    setSliderFrequency(newFrequency);
  };

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
        <IconButton
          onClick={decreaseFrequency}
          disabled={frequency <= MIN_FREQUENCY}
        >
          <RemoveCircleOutlineIcon
            color={frequency > MIN_FREQUENCY ? 'secondary' : 'disabled'}
          />
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
          value={sliderFrequency}
        />
        <IconButton
          onClick={increaseFrequency}
          disabled={frequency >= MAX_FREQUENCY}
        >
          <AddCircleOutlineIcon
            color={frequency < MAX_FREQUENCY ? 'primary' : 'disabled'}
          />
        </IconButton>
      </div>
    </div>
  );
};

FrequencySlider.propTypes = {
  sliderFrequency: PropTypes.number.isRequired,
  setSliderFrequency: PropTypes.func.isRequired,
};

export default FrequencySlider;
