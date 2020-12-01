import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { toggleOscillation } from '../../actions';

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(2, 0),
  },
});
class OscillateSwitch extends Component {
  static propTypes = {
    oscillation: PropTypes.bool.isRequired,
    dispatchToggleOscillation: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      wrapper: PropTypes.string.isRequired,
    }).isRequired,
  };

  onChange = () => {
    const { oscillation, dispatchToggleOscillation } = this.props;
    dispatchToggleOscillation(!oscillation);
  };

  render() {
    const { t, oscillation, classes } = this.props;
    const el = (
      <Switch
        checked={oscillation}
        onChange={this.onChange}
        name={t('Oscillation')}
        color="primary"
      />
    );
    return (
      <FormControlLabel
        className={classes.wrapper}
        control={el}
        label={t('Oscillation')}
        labelPlacement="start"
      />
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  oscillation: layout.lab.oscillation,
});

const mapDispatchToProps = {
  dispatchToggleOscillation: toggleOscillation,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OscillateSwitch);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default withTranslation()(StyledComponent);
