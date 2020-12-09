import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { toggleSideMenu, setAmplitude, setFrequency } from '../../actions';
import OscillateSwitch from './OscillateSwitch';
import LineSelector from './LineSelector';
import CustomSlider from './CustomSlider';
import {
  DRAWER_WIDTH,
  DEFAULT_THEME_DIRECTION,
  DEFAULT_AMPLITUDE,
  MIN_AMPLITUDE,
  MAX_AMPLITUDE,
  AMPLITUDE_STEP,
  DEFAULT_FREQUENCY,
  MIN_FREQUENCY,
  MAX_FREQUENCY,
  FREQUENCY_STEP,
} from '../../config/constants';

const styles = (theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  contentWrapper: {
    margin: theme.spacing(2),
  },
});

class SideMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      drawerHeader: PropTypes.string.isRequired,
      drawerPaper: PropTypes.string.isRequired,
      contentWrapper: PropTypes.string.isRequired,
    }).isRequired,
    theme: PropTypes.shape({
      direction: PropTypes.string.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
    dispatchSetAmplitude: PropTypes.func.isRequired,
    dispatchSetFrequency: PropTypes.func.isRequired,
  };

  handleToggleSideMenu = (open) => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  renderDrawerHeader = () => {
    const { classes, theme, t } = this.props;
    return (
      <>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleToggleSideMenu(false)}>
            {theme.direction === DEFAULT_THEME_DIRECTION ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography variant="h5">{t('Observe')}</Typography>
        </div>
        <Divider />
      </>
    );
  };

  renderDescription = () => {
    const { t } = this.props;
    return (
      <>
        <Typography variant="h6">{t('Description')}</Typography>
        <Typography variant="subtitle1">
          {t('This application renders a radiating charge.')}
        </Typography>
      </>
    );
  };

  render() {
    const {
      classes,
      showSideMenu,
      dispatchSetAmplitude,
      dispatchSetFrequency,
      t,
    } = this.props;

    return (
      <>
        <CssBaseline />
        <Drawer
          variant="persistent"
          anchor="right"
          open={showSideMenu}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {this.renderDrawerHeader()}
          <div className={classes.contentWrapper}>
            {this.renderDescription()}
            <LineSelector />
            <OscillateSwitch />
            <CustomSlider
              sliderLabel={t('Amplitude')}
              sliderDefault={DEFAULT_AMPLITUDE}
              sliderMin={MIN_AMPLITUDE}
              sliderMax={MAX_AMPLITUDE}
              sliderStep={AMPLITUDE_STEP}
              dispatchSliderValue={dispatchSetAmplitude}
            />
            <CustomSlider
              sliderLabel={t('Frequency (Hz)')}
              sliderDefault={DEFAULT_FREQUENCY}
              sliderMin={MIN_FREQUENCY}
              sliderMax={MAX_FREQUENCY}
              sliderStep={FREQUENCY_STEP}
              dispatchSliderValue={dispatchSetFrequency}
              valueLabelDisplay
            />
          </div>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  showSideMenu: layout.showSideMenu,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  dispatchSetFrequency: setFrequency,
  dispatchSetAmplitude: setAmplitude,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default withTranslation()(StyledComponent);
