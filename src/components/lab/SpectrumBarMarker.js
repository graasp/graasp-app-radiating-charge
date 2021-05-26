import React from 'react';
import PropTypes from 'prop-types';
import { Line, Group } from 'react-konva';
import {
  SPECTRUM_BAR_HEIGHT,
  SPECTRUM_BAR_MARKER_COLOR,
  SPECTRUM_BAR_MARKER_TRIANGLE_STROKE_WIDTH,
  SPECTRUM_BAR_MARKER_LINE_STROKE_WIDTH,
  SPECTRUM_BAR_MARKER_TRIANGLE_BASE,
  SPECTRUM_BAR_MARKER_TRIANGLE_HEIGHT,
} from '../../config/constants';

const SpectrumBarMarker = ({ xPosition, yPosition }) => {
  if (xPosition === 0) {
    return null;
  }

  return (
    <Group>
      {/* This is the top triangle of the marker, pointed downward */}
      <Line
        x={xPosition - SPECTRUM_BAR_MARKER_TRIANGLE_BASE / 2}
        y={yPosition}
        points={[
          0,
          0,
          SPECTRUM_BAR_MARKER_TRIANGLE_BASE,
          0,
          SPECTRUM_BAR_MARKER_TRIANGLE_BASE / 2,
          SPECTRUM_BAR_MARKER_TRIANGLE_HEIGHT,
        ]}
        // prop closed={true} is the best way to close a shape in konva
        closed
        stroke={SPECTRUM_BAR_MARKER_COLOR}
        strokeWidth={SPECTRUM_BAR_MARKER_TRIANGLE_STROKE_WIDTH}
        fill={SPECTRUM_BAR_MARKER_COLOR}
      />
      {/* This is the vertical line connecting the two triangles */}
      <Line
        x={xPosition}
        y={yPosition}
        points={[0, 0, 0, SPECTRUM_BAR_HEIGHT]}
        stroke={SPECTRUM_BAR_MARKER_COLOR}
        strokeWidth={SPECTRUM_BAR_MARKER_LINE_STROKE_WIDTH}
      />
      {/* This is the top triangle of the marker, pointed upward */}
      <Line
        x={xPosition - SPECTRUM_BAR_MARKER_TRIANGLE_BASE / 2}
        y={yPosition + SPECTRUM_BAR_HEIGHT}
        points={[
          0,
          0,
          SPECTRUM_BAR_MARKER_TRIANGLE_BASE,
          0,
          SPECTRUM_BAR_MARKER_TRIANGLE_BASE / 2,
          -1 * SPECTRUM_BAR_MARKER_TRIANGLE_HEIGHT,
        ]}
        // prop closed={true} is the best way to close a shape in konva
        closed
        stroke={SPECTRUM_BAR_MARKER_COLOR}
        strokeWidth={SPECTRUM_BAR_MARKER_TRIANGLE_STROKE_WIDTH}
        fill={SPECTRUM_BAR_MARKER_COLOR}
      />
    </Group>
  );
};

SpectrumBarMarker.propTypes = {
  yPosition: PropTypes.number.isRequired,
  xPosition: PropTypes.number.isRequired,
};

export default SpectrumBarMarker;
