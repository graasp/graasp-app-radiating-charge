import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  DEFAULT_TENSION,
  MAX_POINTS_FOR_LINES,
  SET_INTERVAL_TIME,
  STROKE_COLOR,
} from '../../config/constants';

export default class EmittedLine extends Component {
  state = {
    points: [0, 0],
  };

  static propTypes = {
    isPaused: PropTypes.bool.isRequired,
    chargeOscillation: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    angle: PropTypes.number.isRequired,
    emittedLineStepSize: PropTypes.number.isRequired,
    charge: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.beginLineInterval();
  }

  componentDidUpdate(prevProps) {
    const { isPaused } = this.props;
    if (isPaused !== prevProps.isPaused && isPaused) {
      clearInterval(this.emittedLineInterval);
    } else if (isPaused !== prevProps.isPaused && !isPaused) {
      this.beginLineInterval();
    }
  }

  beginLineInterval = () => {
    this.emittedLineInterval = setInterval(() => {
      const { points } = this.state;
      const {
        chargeOscillation: { x, y },
        angle,
        emittedLineStepSize,
      } = this.props;

      // add points in respective direction
      let newPoints = points
        .slice(2)
        .map((value, i) =>
          i % 2 === 0
            ? value + Math.cos(-angle) * emittedLineStepSize
            : value + Math.sin(-angle) * emittedLineStepSize,
        );

      // the first point is where the charge is
      // add second point where the new point should be
      // keeps only MAX_POINTS_FOR_LINES first points
      newPoints = [0, 0, x, y, ...newPoints].slice(0, MAX_POINTS_FOR_LINES);
      this.setState({
        points: newPoints,
      });
    }, SET_INTERVAL_TIME);
  };

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
