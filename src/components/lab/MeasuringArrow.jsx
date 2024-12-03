import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group, Text, Arrow } from 'react-konva';
import {
  MEASURING_ARROW_POINTER_LENGTH,
  MEASURING_ARROW_POINTER_WIDTH,
  MEASURING_ARROW_STROKE_WIDTH,
  MEASURING_ARROW_STROKE_COLOR,
  MEASURING_ARROW_PX_TO_NM,
  MEASURING_ARROW_SYMBOL_CHAR_CODE,
  MEASURING_ARROW_DEFAULT_FONT_SIZE,
} from '../../config/constants';

const MeasuringArrow = ({ stageWidth, stageHeight }) => {
  const { measuringArrowWidth } = useSelector(({ lab }) => lab);

  const onMouseEnter = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'grab';
  };

  const onMouseLeave = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'default';
  };

  // initially place arrow 20% from left and 20% from top of canvas
  const arrowInitialXPosition = 0.2 * stageWidth;
  const arrowInitialYPosition = 0.2 * stageHeight;

  return (
    <Group draggable onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Text
        text={String.fromCharCode(MEASURING_ARROW_SYMBOL_CHAR_CODE)}
        x={arrowInitialXPosition}
        y={arrowInitialYPosition - 10 * MEASURING_ARROW_POINTER_LENGTH}
        width={measuringArrowWidth - MEASURING_ARROW_POINTER_LENGTH}
        align="center"
        fontSize={MEASURING_ARROW_DEFAULT_FONT_SIZE}
      />
      <Text
        text={`${Math.floor(measuringArrowWidth * MEASURING_ARROW_PX_TO_NM)}nm`}
        x={arrowInitialXPosition}
        y={arrowInitialYPosition - 5 * MEASURING_ARROW_POINTER_LENGTH}
        width={measuringArrowWidth - MEASURING_ARROW_POINTER_LENGTH}
        align="center"
        fontSize={MEASURING_ARROW_DEFAULT_FONT_SIZE}
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
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
};

export default MeasuringArrow;
