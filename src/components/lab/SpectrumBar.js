import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Group, Text, Rect } from 'react-konva';
import SpectrumBarMarker from './SpectrumBarMarker';
import {
  SPECTRUM_BAR_HEIGHT,
  INFRARED_BAR_WIDTH,
  VISIBLE_LIGHT_BAR_WIDTH,
  ULTRAVIOLET_BAR_WIDTH,
  TOTAL_SPECTRUM_BAR_WIDTH,
  SPECTRUM_BAR_STROKE_COLOR,
  SPECTRUM_BAR_STROKE_WIDTH,
  INFRARED_COLOR_RANGE,
  VISIBLE_LIGHT_COLOR_RANGE,
  ULTRAVIOLET_COLOR_RANGE,
  SPECTRUM_BAR_LABELS_FONT_SIZE,
  INFRARED_BAR_LABEL_COLOR,
  ULTRAVIOLET_BAR_LABEL_COLOR,
  WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR,
  WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR,
  MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR,
  MAX_DISPLAYED_WAVELENGTH,
  MIN_DISPLAYED_WAVELENGTH,
  APPROXIMATE_WAVELENGTH_LABEL_WIDTH,
} from '../../config/constants';
import { calculateWavelength } from '../../utils/physics';

const SpectrumBar = ({
  stageWidth,
  stageHeight,
  frequency,
  shouldOscillate,
}) => {
  // ref attached to wavelength label (used to detect its width and position it)
  // initialized to APPROXIMATE_WAVELENGTH_LABEL_WIDTH to minimize adjustment/jump after element has been rendered
  const wavelengthLabel = useRef(null);
  const [wavelengthLabelWidth, setWavelengthLabelWidth] = useState(
    APPROXIMATE_WAVELENGTH_LABEL_WIDTH,
  );
  const { t } = useTranslation();

  // on component mount, measure width of wavelength label, update state
  useEffect(() => {
    setWavelengthLabelWidth(wavelengthLabel.current.textWidth);
  }, []);

  // centers spectrum bar horizontally
  const spectrumBarInitialXPosition =
    stageWidth / 2 - TOTAL_SPECTRUM_BAR_WIDTH / 2;
  const spectrumBarInitialYPosition = 0.85 * stageHeight;

  // used to determine x position of SpectrumBarMarker; if wavelength > 1000 or < 100, return 0 (no spectrum bar marker shown)
  const wavelength = calculateWavelength(frequency);
  const spectrumBarMarkerXPosition =
    wavelength > MAX_DISPLAYED_WAVELENGTH ||
    wavelength < MIN_DISPLAYED_WAVELENGTH
      ? 0
      : spectrumBarInitialXPosition +
        (MAX_DISPLAYED_WAVELENGTH - wavelength) /
          MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR;

  return (
    <Group>
      {/* three rectangles, one for each portion of the spectrum bar */}
      <Rect
        x={spectrumBarInitialXPosition}
        y={spectrumBarInitialYPosition}
        width={INFRARED_BAR_WIDTH}
        height={SPECTRUM_BAR_HEIGHT}
        stroke={SPECTRUM_BAR_STROKE_COLOR}
        strokeWidth={SPECTRUM_BAR_STROKE_WIDTH}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: INFRARED_BAR_WIDTH,
          y: 0,
        }}
        fillLinearGradientColorStops={INFRARED_COLOR_RANGE}
      />
      <Rect
        x={spectrumBarInitialXPosition + INFRARED_BAR_WIDTH}
        y={spectrumBarInitialYPosition}
        width={VISIBLE_LIGHT_BAR_WIDTH}
        height={SPECTRUM_BAR_HEIGHT}
        stroke={SPECTRUM_BAR_STROKE_COLOR}
        strokeWidth={SPECTRUM_BAR_STROKE_WIDTH}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: VISIBLE_LIGHT_BAR_WIDTH,
          y: 0,
        }}
        fillLinearGradientColorStops={VISIBLE_LIGHT_COLOR_RANGE}
      />
      <Rect
        x={
          spectrumBarInitialXPosition +
          INFRARED_BAR_WIDTH +
          VISIBLE_LIGHT_BAR_WIDTH
        }
        y={spectrumBarInitialYPosition}
        width={ULTRAVIOLET_BAR_WIDTH}
        height={SPECTRUM_BAR_HEIGHT}
        stroke={SPECTRUM_BAR_STROKE_COLOR}
        strokeWidth={SPECTRUM_BAR_STROKE_WIDTH}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: ULTRAVIOLET_BAR_WIDTH,
          y: 0,
        }}
        fillLinearGradientColorStops={ULTRAVIOLET_COLOR_RANGE}
      />
      {/* two text labels for labels inside the spectrum bar */}
      <Text
        text={t('Infrared')}
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        // on x-axis, place text slightly to the right of the start of the spectrum bar
        x={spectrumBarInitialXPosition + 10}
        // on y-axis, center vertically, given spectrum bar height and this text element's fontSize
        y={
          spectrumBarInitialYPosition +
          (SPECTRUM_BAR_HEIGHT - SPECTRUM_BAR_LABELS_FONT_SIZE) / 2
        }
        fill={INFRARED_BAR_LABEL_COLOR}
      />
      <Text
        text={t('Ultraviolet')}
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        // on x-axis, place text slightly to the left of the end of the spectrum bar
        x={
          spectrumBarInitialXPosition +
          INFRARED_BAR_WIDTH +
          VISIBLE_LIGHT_BAR_WIDTH +
          ULTRAVIOLET_BAR_WIDTH -
          80
        }
        // on y-axis, center vertically, given spectrum bar height and this text element's fontSize
        y={
          spectrumBarInitialYPosition +
          (SPECTRUM_BAR_HEIGHT - SPECTRUM_BAR_LABELS_FONT_SIZE) / 2
        }
        fill={ULTRAVIOLET_BAR_LABEL_COLOR}
      />
      {/* wavelength labels */}
      <Text
        text={t('Wavelength (nm)')}
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        ref={wavelengthLabel}
        // this positions the label in the middle of the spectrum bar
        x={
          spectrumBarInitialXPosition +
          TOTAL_SPECTRUM_BAR_WIDTH / 2 -
          wavelengthLabelWidth / 2
        }
        // vertically, position it manually
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR * 5
        }
      />
      <Text
        text="1000"
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        x={
          spectrumBarInitialXPosition -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      />
      <Text
        text="700"
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        x={
          spectrumBarInitialXPosition +
          INFRARED_BAR_WIDTH -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      />
      <Text
        text="400"
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        x={
          spectrumBarInitialXPosition +
          INFRARED_BAR_WIDTH +
          VISIBLE_LIGHT_BAR_WIDTH -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      />
      <Text
        text="100"
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        x={
          spectrumBarInitialXPosition +
          TOTAL_SPECTRUM_BAR_WIDTH -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      />
      <SpectrumBarMarker
        xPosition={spectrumBarMarkerXPosition}
        yPosition={spectrumBarInitialYPosition}
        shouldOscillate={shouldOscillate}
      />
    </Group>
  );
};

SpectrumBar.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  frequency: PropTypes.number.isRequired,
  shouldOscillate: PropTypes.bool.isRequired,
};

export default SpectrumBar;
