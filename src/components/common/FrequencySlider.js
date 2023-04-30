import React from 'react';
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
  FREQUENCY_CONVERSION_FACTOR,
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

const FrequencySlider = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { frequency } = useSelector(({ lab }) => lab);
  const adjustedFrequency = frequency * FREQUENCY_CONVERSION_FACTOR;

  const increaseFrequency = () => {
    const newFrequency =
      adjustedFrequency === MAX_FREQUENCY
        ? adjustedFrequency
        : FREQUENCY_MARKS[FREQUENCY_MARKS.indexOf(adjustedFrequency) + 1];
    dispatch(setFrequency(newFrequency / FREQUENCY_CONVERSION_FACTOR));
  };

  const decreaseFrequency = () => {
    const newFrequency =
      adjustedFrequency === MIN_FREQUENCY
        ? adjustedFrequency
        : FREQUENCY_MARKS[FREQUENCY_MARKS.indexOf(adjustedFrequency) - 1];
    dispatch(setFrequency(newFrequency / FREQUENCY_CONVERSION_FACTOR));
  };

  const adjustFrequency = (event, newValue) => {
    dispatch(setFrequency(newValue / FREQUENCY_CONVERSION_FACTOR));
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
          value={adjustedFrequency}
        />
        <IconButton onClick={increaseFrequency}>
          <AddCircleOutlineIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

export default FrequencySlider;
