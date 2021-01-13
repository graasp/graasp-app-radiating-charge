import React from 'react';
import PropTypes from 'prop-types';
import { Group, Text, Arrow } from 'react-konva';
import {
  MEASURING_ARROW_POINTER_LENGTH,
  MEASURING_ARROW_POINTER_WIDTH,
  MEASURING_ARROW_STROKE_WIDTH,
  MEASURING_ARROW_STROKE_COLOR,
  MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR,
} from '../../config/constants';

const MeasuringArrow = ({ measuringArrowWidth, stageWidth, stageHeight }) => {
  const onMouseEnter = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'grab';
  };

  const onMouseLeave = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'default';
  };

  // place arrow 10% from left and 20% from top of canvas
  const arrowInitialXPosition = 0.1 * stageWidth;
  const arrowInitialYPosition = 0.2 * stageHeight;

  return (
    <Group draggable onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Text
        text={`${
          measuringArrowWidth *
          MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR
        }nm`}
        // manually position text above arrow
        x={arrowInitialXPosition + MEASURING_ARROW_POINTER_WIDTH}
        y={arrowInitialYPosition - 4 * MEASURING_ARROW_POINTER_LENGTH}
      />
      <Arrow
        x={arrowInitialXPosition}
        y={arrowInitialYPosition}
        points={[0, 0, measuringArrowWidth - MEASURING_ARROW_POINTER_LENGTH, 0]}
        pointerLength={MEASURING_ARROW_POINTER_LENGTH}
        pointerWidth={MEASURING_ARROW_POINTER_WIDTH}
        strokeWidth={MEASURING_ARROW_STROKE_WIDTH}
        stroke={MEASURING_ARROW_STROKE_COLOR}
        pointerAtBeginning
      />
    </Group>
  );
};

MeasuringArrow.propTypes = {
  measuringArrowWidth: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
};

export default MeasuringArrow;
