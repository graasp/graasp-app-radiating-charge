import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Group, Text, Arrow } from 'react-konva';
import {
  MEASURING_ARROW_POINTER_LENGTH,
  MEASURING_ARROW_POINTER_WIDTH,
  MEASURING_ARROW_STROKE_WIDTH,
  MEASURING_ARROW_STROKE_COLOR,
  MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR,
  MEASURING_ARROW_TEXT_FONT_SIZE,
} from '../../config/constants';

const MeasuringArrow = ({ measuringArrowWidth, stageWidth, stageHeight }) => {
  // refs attached to text nodes above meauring arrow (used to detect their width and position them)
  const unitsTextNode = useRef(null);
  const crossHairTextNode = useRef(null);
  const [unitsTextNodeWidth, setUnitsTextNodeWidth] = useState(0);
  const [crossHairTextNodeWidth, setCrossHairTextNodeWidth] = useState(0);

  // whenever measuringArrowWidth changes, update position of text nodes
  useEffect(() => {
    setUnitsTextNodeWidth(unitsTextNode.current.textWidth);
    setCrossHairTextNodeWidth(crossHairTextNode.current.textWidth);
  }, [measuringArrowWidth]);

  const onMouseEnter = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'grab';
  };

  const onMouseLeave = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'default';
  };

  // place arrow 10% from left and 20% from top of canvas
  const arrowInitialXPosition = 0.2 * stageWidth;
  const arrowInitialYPosition = 0.2 * stageHeight;

  return (
    <Group draggable onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Text
        // CharCode 8982 is the crosshair indicating draggability
        text={String.fromCharCode(8982)}
        ref={crossHairTextNode}
        x={
          arrowInitialXPosition +
          (measuringArrowWidth - MEASURING_ARROW_POINTER_LENGTH) / 2 -
          crossHairTextNodeWidth / 2
        }
        // 'manually' position text above arrow
        y={arrowInitialYPosition - 10 * MEASURING_ARROW_POINTER_LENGTH}
        fontSize={MEASURING_ARROW_TEXT_FONT_SIZE}
      />
      <Text
        text={`${
          measuringArrowWidth *
          MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR
        }nm`}
        ref={unitsTextNode}
        x={
          arrowInitialXPosition +
          (measuringArrowWidth - MEASURING_ARROW_POINTER_LENGTH) / 2 -
          unitsTextNodeWidth / 2
        }
        // 'manually' position text above arrow
        y={arrowInitialYPosition - 5 * MEASURING_ARROW_POINTER_LENGTH}
        fontSize={MEASURING_ARROW_TEXT_FONT_SIZE}
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
