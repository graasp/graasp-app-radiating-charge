import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import { Typography, withStyles } from '@material-ui/core';
import { setAmplitude } from '../../actions';
import {
  DEFAULT_AMPLITUDE_VALUE,
  MAX_AMPLITUDE_VALUE,
} from '../../config/constants';

const marks = [
  {
    value: 0,
    label: 0,
  },
  {
    value: DEFAULT_AMPLITUDE_VALUE,
    label: DEFAULT_AMPLITUDE_VALUE,
  },
  {
    value: MAX_AMPLITUDE_VALUE,
    label: MAX_AMPLITUDE_VALUE,
  },
];

const styles = (theme) => ({
  container: {
    margin: theme.spacing(2, 0),
  },
  slider: {
    width: '95%',
  },
});

class AmplitudeSlider extends Component {
  propTypes = {
    amplitude: PropTypes.bool.isRequired,
    dispatchSetAmplitude: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      slider: PropTypes.string.isRequired,
    }).isRequired,
  };

  amplitude = () => {
    const { amplitude, dispatchSetAmplitude } = this.props;
    dispatchSetAmplitude(!amplitude);
  };

  valuetext = (value) => {
    return `${value}°C`;
  };

  onChange = (event, newValue) => {
    const { dispatchSetAmplitude } = this.props;
    dispatchSetAmplitude(newValue);
  };

  render() {
    const { t, classes } = this.props;

    return (
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">{t('Amplitude')}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Slider
            onChange={this.onChange}
            className={classes.slider}
            defaultValue={20}
            getAriaValueText={this.valueText}
            valueLabelDisplay="auto"
            marks={marks}
            max={MAX_AMPLITUDE_VALUE}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  amplitude: layout.lab.amplitude,
});

const mapDispatchToProps = {
  dispatchSetAmplitude: setAmplitude,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AmplitudeSlider);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default withTranslation()(StyledComponent);
