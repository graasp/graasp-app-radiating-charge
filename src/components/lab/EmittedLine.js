/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Line } from 'react-konva';
import {
  DEFAULT_TENSION,
  LINE_STEP_SIZE,
  MAX_POINTS_FOR_LINES,
  SET_INTERVAL_TIME,
  STROKE_COLOR,
} from '../../config/constants';

export default class EmittedLine extends Component {
  state = {
    points: [0, 0],
  };

  componentDidMount() {
    setInterval(() => {
      const { points } = this.state;
      const {
        chargeOscillation: { x, y },
        angle,
      } = this.props;

      // add points in respective direction
      let newPoints = points
        .slice(2)
        .map((value, i) =>
          i % 2 === 0
            ? value + Math.cos(angle) * LINE_STEP_SIZE
            : value + Math.sin(angle) * LINE_STEP_SIZE,
        );

      // the first point is where the charge is
      // add second point where the new point should be
      // keeps only MAX_POINTS_FOR_LINES first points
      newPoints = [0, 0, x, y, ...newPoints].slice(0, MAX_POINTS_FOR_LINES);
      this.setState({
        points: newPoints,
      });
    }, SET_INTERVAL_TIME);
  }

  render() {
    const {
      charge: { x, y },
    } = this.props;
    const { points } = this.state;
    return (
      <Line
        x={x}
        y={y}
        points={points}
        tension={DEFAULT_TENSION}
        stroke={STROKE_COLOR}
      />
    );
  }
}
