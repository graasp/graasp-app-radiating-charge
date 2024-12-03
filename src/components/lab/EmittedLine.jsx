import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import { DEFAULT_TENSION, STROKE_COLOR } from '../../config/constants';
import { generateOscillationCurve } from '../../utils/physics';

const EmittedLine = ({ intervalCount, angle, x, y, frequency, amplitude }) => {
  const { stageDimensions } = useSelector(({ layout }) => layout);
  const { width, height } = stageDimensions;

  const linePoints = generateOscillationCurve(
    intervalCount,
    angle,
    frequency,
    amplitude,
    width,
    height,
  );

  return (
    <Line
      tension={DEFAULT_TENSION}
      stroke={STROKE_COLOR}
      points={linePoints}
      x={x}
      y={y}
    />
  );
};

EmittedLine.propTypes = {
  intervalCount: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  frequency: PropTypes.number.isRequired,
  amplitude: PropTypes.number.isRequired,
};

export default EmittedLine;
