import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  GRID_AXES_COLOR,
  GRID_AXES_STROKE_WIDTH,
  MEASURING_ARROW_STEP,
} from '../../config/constants';

const Grid = ({ gridWidth, gridHeight }) => {
  // MEASURING_ARROW_STEP is the increment with which the measuring arrow's width is increased
  // each MEASURING_ARROW_STEP is '100nm'
  // we want the squares in our grid to have 100nm x 100nm dimensions
  // for clarity, re-assign MEASURING_ARROW_STEP to another variable
  const GRID_SQUARE_WIDTH_AND_HEIGHT = MEASURING_ARROW_STEP;

  // in return statement below, a VERTICAL line is drawn at each of the points in xTicksArray
  // for alignment purposes, ensure xTicksArray includes the point startingXTick
  // this ensures that the vertical radiation line emitted by the charge is in line with the grid
  const centralXTick = gridWidth / 2;
  const totalNumberOfXTicks = Math.ceil(
    gridWidth / GRID_SQUARE_WIDTH_AND_HEIGHT,
  );
  const startingXTick =
    centralXTick -
    Math.floor(totalNumberOfXTicks / 2) * GRID_SQUARE_WIDTH_AND_HEIGHT;
  const xTicksArray = new Array(totalNumberOfXTicks)
    .fill()
    .map(
      (emptyElement, index) =>
        startingXTick + index * GRID_SQUARE_WIDTH_AND_HEIGHT,
    );

  // in return statement below, a HORIZONTAL line is drawn at each of the points in yTicksArray
  // for alignment purposes, ensure yTicksArray includes the point startingYTick
  // this ensures that the horizontal radiation line emitted by the charge is in line with the grid
  const centralYTick = gridHeight / 2;
  const totalNumberOfYTicks = Math.ceil(
    gridHeight / GRID_SQUARE_WIDTH_AND_HEIGHT,
  );
  const startingYTick =
    centralYTick -
    Math.floor(totalNumberOfYTicks / 2) * GRID_SQUARE_WIDTH_AND_HEIGHT;
  const yTicksArray = new Array(totalNumberOfYTicks)
    .fill()
    .map(
      (emptyElement, index) =>
        startingYTick + index * GRID_SQUARE_WIDTH_AND_HEIGHT,
    );

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
};

export default Grid;
