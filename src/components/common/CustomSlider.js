import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { makeStyles } from '@material-ui/core/styles';

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

const CustomSlider = ({
  sliderLabel,
  additionalSliderLabelInfo,
  dispatchSliderValue,
  sliderDefault,
  sliderStep,
  sliderMin,
  sliderMax,
  valueLabelDisplay,
  displayConversionFactor,
}) => {
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState(sliderDefault);

  const increaseSlider = () => {
    setSliderValue((prevValue) => Math.min(prevValue + sliderStep, sliderMax));
  };

  const decreaseSlider = () => {
    setSliderValue((prevValue) => Math.max(prevValue - sliderStep, sliderMin));
  };

  const adjustSlider = (event, newValue) => {
    setSliderValue(newValue);
  };

  useEffect(() => {
    dispatchSliderValue(sliderValue);
  }, [sliderValue]);

  return (
    <div className={classes.container}>
      <div className={classes.typographyContainer}>
        <Typography variant="body2">{sliderLabel}</Typography>
        {additionalSliderLabelInfo && (
          <Typography variant="body2" className={classes.unit}>
            {'('}
            {additionalSliderLabelInfo.base}
            <sup className={classes.superscript}>
              {additionalSliderLabelInfo.power}
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            </sup>{' '}
            {additionalSliderLabelInfo.unit}
            {')'}
          </Typography>
        )}
      </div>
      <div className={classes.sliderContainer}>
        <IconButton onClick={decreaseSlider}>
          <RemoveCircleOutlineIcon color="secondary" />
        </IconButton>
        <Slider
          value={sliderValue}
          onChange={adjustSlider}
          aria-labelledby={sliderLabel}
          step={sliderStep}
          min={sliderMin}
          max={sliderMax}
          valueLabelDisplay={valueLabelDisplay && 'on'}
          // sometimes value in slider is e.g. x.0000000000y, in which case valueLabelFormat forces x.00 to display
          valueLabelFormat={
            (value) => parseFloat((value * displayConversionFactor).toFixed(2))
            // eslint and prettier going crazy :( :(, therefore this disable
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <IconButton onClick={increaseSlider}>
          <AddCircleOutlineIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

CustomSlider.propTypes = {
  sliderLabel: PropTypes.string.isRequired,
  dispatchSliderValue: PropTypes.func.isRequired,
  sliderDefault: PropTypes.number.isRequired,
  sliderStep: PropTypes.number.isRequired,
  sliderMin: PropTypes.number.isRequired,
  sliderMax: PropTypes.number.isRequired,
  valueLabelDisplay: PropTypes.bool.isRequired,
  additionalSliderLabelInfo: PropTypes.shape({
    unit: PropTypes.string,
    base: PropTypes.string,
    power: PropTypes.string,
  }),
  displayConversionFactor: PropTypes.number,
};

CustomSlider.defaultProps = {
  additionalSliderLabelInfo: null,
  displayConversionFactor: null,
};

export default CustomSlider;
