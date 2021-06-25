import React from 'react';
import { Rect, Group, Text } from 'react-konva';
import PropTypes from 'prop-types';
import {
  BACKGROUND_COLOR,
  GRID_AXES_COLOR,
  GRID_AXES_STROKE_WIDTH,
  GRID_LEGEND_LABEL_TEXT,
  GRID_SCALE_FONT_SIZE,
  GRID_SCALE_TEXT_WIDTH,
  SCALE_STROKE_MARGIN,
} from '../../config/constants';

const GridScale = ({ x, y, gridSquareWidthAndHeight }) => {
  return (
    <Group x={x} y={y}>
      <Rect
        stroke={GRID_AXES_COLOR}
        strokeWidth={GRID_AXES_STROKE_WIDTH + SCALE_STROKE_MARGIN}
        width={gridSquareWidthAndHeight}
        height={gridSquareWidthAndHeight}
      />
      <Text
        x={-GRID_SCALE_TEXT_WIDTH}
        y={5}
        text={`${GRID_LEGEND_LABEL_TEXT}`}
        fontSize={GRID_SCALE_FONT_SIZE}
        shadowColor={BACKGROUND_COLOR}
        color={GRID_AXES_COLOR}
        shadowBlur={2}
        shadowOpacity={1}
        align="right"
      />
    </Group>
  );
};

GridScale.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  gridSquareWidthAndHeight: PropTypes.number.isRequired,
};

export default GridScale;
