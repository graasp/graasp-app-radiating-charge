import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withTranslation } from 'react-i18next';
import { toggleSettings } from '../../../actions';
import Loader from '../../common/Loader';
import LanguageSelect from './LanguageSelect';
import { DEFAULT_HEADER_VISIBLE } from '../../../config/constants';

const modalTopPercent = 50;
const modalLeftPercent = 50;

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    top: `${modalTopPercent}%`,
    left: `${modalLeftPercent}%`,
    transform: `translate(-${modalTopPercent}%, -${modalLeftPercent}%)`,
  },
  button: {
    margin: theme.spacing(),
  },
});

class Settings extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      paper: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    activity: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      headerVisible: PropTypes.bool,
    }),
    t: PropTypes.func.isRequired,
    dispatchToggleSettings: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    settings: {
      headerVisible: DEFAULT_HEADER_VISIBLE,
    },
  };

  handleClose = () => {
    const { dispatchToggleSettings } = this.props;
    dispatchToggleSettings(false);
  };

  renderModalContent() {
    const { t, settings, activity } = this.props;
    const { headerVisible } = settings;

    if (activity) {
      return <Loader />;
    }

    const switchControl = (
      <Switch
        color="primary"
        checked={headerVisible}
        onChange={() => {}}
        value="headerVisibility"
      />
    );

    return (
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel control={switchControl} label={t('Show Header')} />
        </Grid>
        <Grid item xs={12}>
          <LanguageSelect />
        </Grid>
      </Grid>
    );
  }

  render() {
    const { open, classes, t } = this.props;

    return (
      <Modal open={open} onClose={this.handleClose}>
        <div className={classes.paper}>
          <Typography variant="h5">{t('Settings')}</Typography>
          {this.renderModalContent()}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ layout }) => {
  return {
    open: layout.settings.open,
  };
};

const mapDispatchToProps = {
  dispatchToggleSettings: toggleSettings,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
const TranslatedComponent = withTranslation()(ConnectedComponent);

export default withStyles(styles)(TranslatedComponent);
