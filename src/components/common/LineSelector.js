import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { postAction, setNumberOfLines } from '../../actions';
import {
  DEFAULT_NUMBER_OF_LINES,
  MIN_NUMBER_OF_LINES,
  MAX_NUMBER_OF_LINES,
  NUMBER_OF_LINES_STEP,
  PAUSED_STRING,
  PLAYING_STRING,
} from '../../config/constants';
import {
  DECREASED_NUMBER_OF_LINES,
  INCREASED_NUMBER_OF_LINES,
} from '../../config/verbs';

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
    dispatchPostAction: PropTypes.func.isRequired,
    isPaused: PropTypes.bool.isRequired,
  };

  state = {
    currentNumberOfLines: DEFAULT_NUMBER_OF_LINES,
  };

  onChange = (event) => {
    const { currentNumberOfLines } = this.state;
    const {
      dispatchSetNumberOflines,
      dispatchPostAction,
      isPaused,
    } = this.props;
    const applicationState = isPaused ? PAUSED_STRING : PLAYING_STRING;
    const newNumberOfLines = event.target.value;
    dispatchSetNumberOflines(newNumberOfLines);
    dispatchPostAction({
      verb:
        newNumberOfLines > currentNumberOfLines
          ? INCREASED_NUMBER_OF_LINES
          : DECREASED_NUMBER_OF_LINES,
      data: { newNumberOfLines, applicationState },
    });
    this.setState({ currentNumberOfLines: newNumberOfLines });
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

const mapStateToProps = ({ lab }) => ({
  numberOfLines: lab.numberOfLines,
  isPaused: lab.isPaused,
});

const mapDispatchToProps = {
  dispatchSetNumberOflines: setNumberOfLines,
  dispatchPostAction: postAction,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LineSelector);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default withTranslation()(StyledComponent);
