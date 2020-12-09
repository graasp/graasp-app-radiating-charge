import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  typography: {
    marginRight: theme.spacing(2),
  },
  button: {
    borderRadius: '50%',
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '70%',
  },
}));

const CustomSlider = ({
  sliderLabel,
  dispatchSliderValue,
  sliderDefault,
  sliderStep,
  sliderMin,
  sliderMax,
  valueLabelDisplay,
}) => {
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState(sliderDefault);
  const shouldOscillate = useSelector(({ layout }) => layout.lab.oscillation);

  const increaseSlider = () => {
    if (shouldOscillate) {
      setSliderValue((prevValue) =>
        Math.min(prevValue + sliderStep, sliderMax),
      );
    }
  };

  const decreaseSlider = () => {
    if (shouldOscillate) {
      setSliderValue((prevValue) =>
        Math.max(prevValue - sliderStep, sliderMin),
      );
    }
  };

  const adjustSlider = (event, newValue) => {
    setSliderValue(newValue);
  };

  useEffect(() => {
    dispatchSliderValue(sliderValue);
  }, [sliderValue]);

  return (
    <div className={classes.container}>
      <Typography variant="body2" className={classes.typography}>
        {sliderLabel}
      </Typography>
      <div className={classes.sliderContainer}>
        <IconButton onClick={decreaseSlider}>
          <RemoveCircleOutlineIcon
            color={shouldOscillate ? 'secondary' : 'disabled'}
          />
        </IconButton>
        <Slider
          value={sliderValue}
          onChange={adjustSlider}
          aria-labelledby={sliderLabel}
          step={sliderStep}
          min={sliderMin}
          max={sliderMax}
          disabled={!shouldOscillate}
          valueLabelDisplay={valueLabelDisplay && 'auto'}
          // sometimes value in slider is e.g. x.0000000000y, in which case valueLabelFormat forces x.0 to display
          valueLabelFormat={(value) => value.toFixed(1)}
        />
        <IconButton onClick={increaseSlider}>
          <AddCircleOutlineIcon
            color={shouldOscillate ? 'primary' : 'disabled'}
          />
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
};

export default CustomSlider;
