import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Group } from 'react-konva';
import { useTranslation } from 'react-i18next';
import {
  CENTER_STRING,
  INFRARED_COLOR_RANGE,
  MAX_DISPLAYED_WAVELENGTH,
  MIN_DISPLAYED_WAVELENGTH,
  RIGHT_STRING,
  SPECTRUM_BAR_Y,
  TOTAL_SPECTRUM_BAR_WIDTH,
  ULTRAVIOLET_COLOR_RANGE,
  VISIBLE_LIGHT_COLOR_RANGE,
} from '../../config/constants';
import BarSection from './spectrum-bar/BarSection';
import BarMarker from './spectrum-bar/BarMarker';
import { calculateWavelength } from '../../utils/physics';

const SpectrumBar = ({ frequency }) => {
  const { t } = useTranslation();
  const { width: stageWidth, height: stageHeight } = useSelector(
    ({ layout }) => layout.stageDimensions,
  );

  const x = stageWidth / 2 - TOTAL_SPECTRUM_BAR_WIDTH / 2;
  const y = SPECTRUM_BAR_Y * stageHeight;
  const sectionWidth = TOTAL_SPECTRUM_BAR_WIDTH / 3;

  const wavelength = calculateWavelength(frequency);
  const markerX =
    wavelength > MAX_DISPLAYED_WAVELENGTH ||
    wavelength < MIN_DISPLAYED_WAVELENGTH
      ? -1
      : TOTAL_SPECTRUM_BAR_WIDTH -
        ((MAX_DISPLAYED_WAVELENGTH - wavelength) * TOTAL_SPECTRUM_BAR_WIDTH) /
          (MAX_DISPLAYED_WAVELENGTH - MIN_DISPLAYED_WAVELENGTH);

  return (
    <Group x={x} y={y}>
      <BarSection
        gradientFill={ULTRAVIOLET_COLOR_RANGE}
        sectionWidth={sectionWidth}
        mainLabel={t('Ultraviolet [UV]')}
        bottomLabel="100"
      />
      <BarSection
        gradientFill={VISIBLE_LIGHT_COLOR_RANGE}
        sectionWidth={sectionWidth}
        x={sectionWidth}
        bottomLabel={t('Wavelength (nm)')}
        labelAlign={CENTER_STRING}
      />
      <BarSection
        gradientFill={INFRARED_COLOR_RANGE}
        sectionWidth={sectionWidth}
        x={2 * sectionWidth}
        mainLabel={t('Infrared [IR]')}
        labelAlign={RIGHT_STRING}
        bottomLabel="1000"
      />
      <BarMarker x={markerX} />
    </Group>
  );
};

SpectrumBar.propTypes = {
  frequency: PropTypes.number.isRequired,
};

export default SpectrumBar;
