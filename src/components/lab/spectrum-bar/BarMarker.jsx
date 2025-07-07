import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  MARKER_POINTER_HEIGHT,
  MARKER_POINTER_WIDTH,
  SPECTRUM_BAR_HEIGHT,
  MARKER_BORDER,
  MARKER_FILL,
  MARKER_STROKE_WIDTH,
} from '../../../config/constants';
import { generateMarkerPoints } from '../../../utils/canvas';

const BarMarker = ({ x }) => {
  if (x < 0) {
    return null;
  }

  return (
    <Line
      x={x - MARKER_POINTER_WIDTH / 2}
      points={generateMarkerPoints(
        SPECTRUM_BAR_HEIGHT,
        MARKER_POINTER_HEIGHT,
        MARKER_POINTER_WIDTH,
      )}
      closed
      fill={MARKER_FILL}
      stroke={MARKER_BORDER}
      strokeWidth={MARKER_STROKE_WIDTH}
    />
  );
};

BarMarker.propTypes = {
  x: PropTypes.number.isRequired,
};

export default BarMarker;
