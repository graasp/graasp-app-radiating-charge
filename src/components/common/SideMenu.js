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
import {
  toggleSideMenu,
  toggleOscillation,
  toggleGridLines,
  toggleMeasuringArrow,
  toggleSpectrumBar,
  setAmplitude,
  setFrequency,
} from '../../actions';
import LineSelector from './LineSelector';
import CustomSwitch from './CustomSwitch';
import AmplitudeSlider from './AmplitudeSlider';
import FrequencySlider from './FrequencySlider';
import AnimationControls from './AnimationControls';
import MeasuringArrowControls from './MeasuringArrowControls';
import { DRAWER_WIDTH, DEFAULT_THEME_DIRECTION } from '../../config/constants';

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
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
class SideMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      drawerHeader: PropTypes.string.isRequired,
      drawerPaper: PropTypes.string.isRequired,
      contentWrapper: PropTypes.string.isRequired,
      switchContainer: PropTypes.string.isRequired,
    }).isRequired,
    theme: PropTypes.shape({
      direction: PropTypes.string.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    oscillation: PropTypes.bool.isRequired,
    spectrumBar: PropTypes.bool.isRequired,
    gridLines: PropTypes.bool.isRequired,
    measuringArrow: PropTypes.bool.isRequired,
    dispatchToggleGridLines: PropTypes.func.isRequired,
    dispatchToggleMeasuringArrow: PropTypes.func.isRequired,
    dispatchToggleOscillation: PropTypes.func.isRequired,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
    dispatchToggleSpectrumBar: PropTypes.func.isRequired,
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

  render() {
    const {
      classes,
      showSideMenu,
      oscillation,
      gridLines,
      measuringArrow,
      spectrumBar,
      dispatchToggleOscillation,
      dispatchToggleSpectrumBar,
      dispatchToggleGridLines,
      dispatchToggleMeasuringArrow,
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
            <LineSelector />
            <div className={classes.switchContainer}>
              <CustomSwitch
                switchLabel={t('Oscillation')}
                switchStatus={oscillation}
                switchDispatch={dispatchToggleOscillation}
              />
              <AnimationControls />
            </div>
            <div className={classes.switchContainer}>
              <CustomSwitch
                switchLabel={t('Grid')}
                switchStatus={gridLines}
                switchDispatch={dispatchToggleGridLines}
              />
            </div>
            <div className={classes.switchContainer}>
              <CustomSwitch
                switchLabel={t('Measuring arrow')}
                switchStatus={measuringArrow}
                switchDispatch={dispatchToggleMeasuringArrow}
              />
              <MeasuringArrowControls />
            </div>
            <div className={classes.switchContainer}>
              <CustomSwitch
                switchLabel={t('Spectrum bar')}
                switchStatus={spectrumBar}
                switchDispatch={dispatchToggleSpectrumBar}
              />
            </div>
            <AmplitudeSlider dispatchSetAmplitude={dispatchSetAmplitude} />
            <FrequencySlider dispatchSetFrequency={dispatchSetFrequency} />
          </div>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  showSideMenu: layout.showSideMenu,
  oscillation: layout.lab.oscillation,
  gridLines: layout.lab.gridLines,
  measuringArrow: layout.lab.measuringArrow,
  spectrumBar: layout.lab.spectrumBar,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  dispatchToggleGridLines: toggleGridLines,
  dispatchToggleMeasuringArrow: toggleMeasuringArrow,
  dispatchToggleOscillation: toggleOscillation,
  dispatchToggleSpectrumBar: toggleSpectrumBar,
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
