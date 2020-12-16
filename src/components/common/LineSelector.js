import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { setNumberOfLines } from '../../actions';
import {
  DEFAULT_NUMBER_OF_LINES,
  MIN_NUMBER_OF_LINES,
  MAX_NUMBER_OF_LINES,
  NUMBER_OF_LINES_STEP,
} from '../../config/constants';

const styles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
  },
  typography: {
    marginRight: theme.spacing(9),
  },
});

class LineSelector extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      typography: PropTypes.string.isRequired,
    }).isRequired,
    dispatchSetNumberOflines: PropTypes.func.isRequired,
  };

  onChange = (event) => {
    const { dispatchSetNumberOflines } = this.props;
    dispatchSetNumberOflines(event.target.value);
  };

  render() {
    const { t, classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="body2" className={classes.typography}>
          {t('Number of lines')}
        </Typography>
        <TextField
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={DEFAULT_NUMBER_OF_LINES}
          inputProps={{
            min: MIN_NUMBER_OF_LINES,
            max: MAX_NUMBER_OF_LINES,
            step: NUMBER_OF_LINES_STEP,
          }}
          // InputProps is the only way to adjust the text size of the TextField component
          // but eslint assumes inputProps and InputProps are the same
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{ style: { fontSize: 14 } }}
          onChange={this.onChange}
          onKeyDown={(event) => {
            event.preventDefault();
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  numberOfLines: layout.lab.numberOfLines,
});

const mapDispatchToProps = {
  dispatchSetNumberOflines: setNumberOfLines,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LineSelector);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default withTranslation()(StyledComponent);
