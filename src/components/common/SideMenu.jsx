import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider, makeStyles } from '@material-ui/core';
import {
  toggleGridLines,
  toggleMeasuringArrow,
  toggleSpectrumBar,
} from '../../actions';
import CustomSwitch from './CustomSwitch';
import AmplitudeSlider from './AmplitudeSlider';
import FrequencySlider from './FrequencySlider';
import AnimationControls from './AnimationControls';
import MeasuringArrowControls from './MeasuringArrowControls';
import { DEFAULT_FREQUENCY, DRAWER_WIDTH } from '../../config/constants';
import {
  TOGGLED_MEASURING_ARROW_OFF,
  TOGGLED_GRID_OFF,
  TOGGLED_GRID_ON,
  TOGGLED_MEASURING_ARROW_ON,
  TOGGLED_SPECTRUM_BAR_OFF,
  TOGGLED_SPECTRUM_BAR_ON,
} from '../../config/verbs';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  contentWrapper: {
    margin: theme.spacing(2),
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
}));

const SideMenu = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { gridLines, measuringArrow, spectrumBar } = useSelector(
    ({ lab }) => lab,
  );
  const { showSideMenu } = useSelector(({ layout }) => layout);
  const [sliderFrequency, setSliderFrequency] = useState(DEFAULT_FREQUENCY);

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
        <div className={classes.contentWrapper}>
          <AnimationControls
            sliderFrequency={sliderFrequency}
            setSliderFrequency={setSliderFrequency}
          />
          <Divider className={classes.divider} />
          <div className={classes.switchContainer}>
            <CustomSwitch
              switchLabel={t('Grid')}
              switchStatus={gridLines}
              switchAction={toggleGridLines}
              toggleOffAction={TOGGLED_GRID_OFF}
              toggleOnAction={TOGGLED_GRID_ON}
            />
          </div>
          <div className={classes.switchContainer}>
            <CustomSwitch
              switchLabel={t('Measuring arrow')}
              switchStatus={measuringArrow}
              switchAction={toggleMeasuringArrow}
              toggleOffAction={TOGGLED_MEASURING_ARROW_OFF}
              toggleOnAction={TOGGLED_MEASURING_ARROW_ON}
            />
            <MeasuringArrowControls />
          </div>
          <div className={classes.switchContainer}>
            <CustomSwitch
              switchLabel={t('Spectrum bar')}
              switchStatus={spectrumBar}
              switchAction={toggleSpectrumBar}
              toggleOffAction={TOGGLED_SPECTRUM_BAR_OFF}
              toggleOnAction={TOGGLED_SPECTRUM_BAR_ON}
            />
          </div>
          <AmplitudeSlider />
          <FrequencySlider
            sliderFrequency={sliderFrequency}
            setSliderFrequency={setSliderFrequency}
          />
        </div>
      </Drawer>
    </>
  );
};

export default SideMenu;
