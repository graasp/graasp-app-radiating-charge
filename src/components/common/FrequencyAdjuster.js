import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { withStyles } from '@material-ui/core/styles';
import { adjustFrequency } from '../../actions';
import {
  FREQUENCY_ADJUSTMENT_FACTOR_DEFAULT,
  FREQUENCY_ADJUSTMENT_FACTOR_MIN,
  FREQUENCY_ADJUSTMENT_FACTOR_MAX,
  FREQUENCY_ADJUSTMENT_FACTOR_STEP,
  FREQUENCY_RESIDUAL_ERROR_FACTOR,
} from '../../config/constants';

const styles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
  },
  typography: {
    marginRight: theme.spacing(2),
  },
  button: {
    borderRadius: '50%',
  },
});

class FrequencyAdjuster extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      typography: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
    }).isRequired,
    dispatchAdjustFrequency: PropTypes.func.isRequired,
    shouldOscillate: PropTypes.bool.isRequired,
  };

  state = {
    sliderValue: FREQUENCY_ADJUSTMENT_FACTOR_DEFAULT,
  };

  increaseFrequency = () => {
    const { shouldOscillate } = this.props;
    if (shouldOscillate) {
      this.setState(
        (prevState) => {
          const newState =
            prevState.sliderValue + FREQUENCY_ADJUSTMENT_FACTOR_STEP >=
            FREQUENCY_ADJUSTMENT_FACTOR_MAX
              ? FREQUENCY_ADJUSTMENT_FACTOR_MAX
              : prevState.sliderValue + FREQUENCY_ADJUSTMENT_FACTOR_STEP;
          return {
            sliderValue: newState,
          };
        },
        // note: this logic has to be in this.setState's callback (otherwise old state value might dispatch)
        () => {
          const { dispatchAdjustFrequency } = this.props;
          const { sliderValue } = this.state;
          dispatchAdjustFrequency(sliderValue);
        },
      );
    }
  };

  decreaseFrequency = () => {
    const { shouldOscillate } = this.props;
    if (shouldOscillate) {
      this.setState(
        (prevState) => {
          const newState =
            prevState.sliderValue - FREQUENCY_ADJUSTMENT_FACTOR_STEP <=
            // the '+ FREQUENCY_RESIDUAL_ERROR_FACTOR' part is to handle JS floating point errors
            // e.g. you can get 0.05 - 0.05 = 0.0000001
            // therefore, check if the new state <= supplied minimum + some epsilon (if so, set it to minimum)
            FREQUENCY_ADJUSTMENT_FACTOR_MIN + FREQUENCY_RESIDUAL_ERROR_FACTOR
              ? FREQUENCY_ADJUSTMENT_FACTOR_MIN
              : prevState.sliderValue - FREQUENCY_ADJUSTMENT_FACTOR_STEP;
          return {
            sliderValue: newState,
          };
        },
        // note: this logic has to be in this.setState's callback (otherwise old state value might dispatch)
        () => {
          const { dispatchAdjustFrequency } = this.props;
          const { sliderValue } = this.state;
          dispatchAdjustFrequency(sliderValue);
        },
      );
    }
  };

  adjustFrequency = (event, newValue) => {
    this.setState({ sliderValue: newValue });
    const { dispatchAdjustFrequency } = this.props;
    dispatchAdjustFrequency(newValue);
  };

  render() {
    const { t, classes, shouldOscillate } = this.props;
    const { sliderValue } = this.state;

    return (
      <div className={classes.container}>
        <Typography className={classes.typography}>{t('Frequency')}</Typography>
        <IconButton onClick={this.decreaseFrequency}>
          <RemoveCircleOutlineIcon
            color={shouldOscillate ? 'secondary' : 'disabled'}
          />
        </IconButton>
        <Slider
          value={sliderValue}
          onChange={this.adjustFrequency}
          aria-labelledby="frequency-slider"
          step={FREQUENCY_ADJUSTMENT_FACTOR_STEP}
          marks
          min={FREQUENCY_ADJUSTMENT_FACTOR_MIN}
          max={FREQUENCY_ADJUSTMENT_FACTOR_MAX}
          disabled={!shouldOscillate}
        />
        <IconButton onClick={this.increaseFrequency}>
          <AddCircleOutlineIcon
            color={shouldOscillate ? 'primary' : 'disabled'}
          />
        </IconButton>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  frequencyAdjustmentFactor: layout.lab.frequencyAdjustmentFactor,
  shouldOscillate: layout.lab.oscillation,
});

const mapDispatchToProps = {
  dispatchAdjustFrequency: adjustFrequency,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrequencyAdjuster);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default withTranslation()(StyledComponent);
