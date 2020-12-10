import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  GRID_AXES_COLOR,
  GRID_AXES_STROKE_WIDTH,
} from '../../config/constants';

const Grid = ({ gridWidth, gridHeight, numOfxAxisTicks }) => {
  // divide x-axis (=gridWidth) into numOfxAxisTicks equally sized ticks, each of width xTickWidth
  const xTickWidth = gridWidth / numOfxAxisTicks;
  // create an array xTicksArray: in return statement below, a VERTICAL line is drawn at each of the ticks in this array
  const xTicksArray = new Array(numOfxAxisTicks)
    .fill()
    .map((emptyElement, index) => (index + 1) * xTickWidth);

  // to ensure grid is square, assign yTickHeight = xTickWidth
  const yTickHeight = xTickWidth;

  // for alignment purposes, initialize yTicksArray to contain the value (gridHeight / 2)
  // (gridHeight / 2) is the point at which the charge is vertically centered, and from which a horizontal line emanates
  // this ensures that at app initializion a y-axis grid line is also drawn through this point
  const yTicksArray = [gridHeight / 2];

  // just as in xTicksArray, in the return statement below a HORIZONTAL line is drawn at each of the ticks in yTicksArray
  // to calculate these ticks, (1) keep subtracting yTickHeight from the center point all the way to the top of the grid
  // (2) keep adding yTickHeight from the center point all the way to the bottom of the grid (gridHeight)
  // with this setup, the grid is also fully responsive to changes in screen size (nice!)
  let startingPointGoingUp = gridHeight / 2;
  while (startingPointGoingUp > 0) {
    yTicksArray.unshift(startingPointGoingUp - yTickHeight);
    startingPointGoingUp -= yTickHeight;
  }

  let startingPointGoingDown = gridHeight / 2;
  while (startingPointGoingDown < gridHeight) {
    yTicksArray.push(startingPointGoingDown + yTickHeight);
    startingPointGoingDown += yTickHeight;
  }

  return (
    <>
      {xTicksArray.map((tick) => (
        <Line
          x={tick}
          y={0}
          points={[0, 0, 0, gridHeight]}
          stroke={GRID_AXES_COLOR}
          strokeWidth={GRID_AXES_STROKE_WIDTH}
        />
      ))}

      {yTicksArray.map((tick) => (
        <Line
          x={0}
          y={tick}
          points={[0, 0, gridWidth, 0]}
          stroke={GRID_AXES_COLOR}
          strokeWidth={GRID_AXES_STROKE_WIDTH}
        />
      ))}
    </>
  );
};

Grid.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  numOfxAxisTicks: PropTypes.number.isRequired,
};

export default Grid;
