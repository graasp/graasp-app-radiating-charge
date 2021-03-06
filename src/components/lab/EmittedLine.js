import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import _ from 'lodash';
import {
  DEFAULT_TENSION,
  DEFAULT_TIMER_COUNT,
  SET_INTERVAL_TIME,
  STROKE_COLOR,
} from '../../config/constants';

export default class EmittedLine extends Component {
  static initialPoints = [0, 0];

  state = {
    points: EmittedLine.initialPoints,
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
    numberOfLines: PropTypes.number.isRequired,
    maxPointsForLines: PropTypes.number.isRequired,
    oscillation: PropTypes.bool.isRequired,
    timerCount: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.beginLineInterval();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isPaused, oscillation, timerCount, numberOfLines } = this.props;
    if (isPaused !== prevProps.isPaused) {
      if (isPaused && !oscillation) {
        clearInterval(this.emittedLineInterval);
      }
      if (!isPaused && oscillation) {
        clearInterval(this.emittedLineInterval);
        this.beginLineInterval();
      }
    }

    if (
      timerCount !== prevProps.timerCount &&
      timerCount === DEFAULT_TIMER_COUNT
    ) {
      this.beginLineInterval();
    }

    if (
      numberOfLines !== prevProps.numberOfLines &&
      !_.isEqual(prevState.points, EmittedLine.initialPoints)
    ) {
      clearInterval(this.emittedLineInterval);
      this.resetLine();
      this.beginLineInterval();
    }
  }

  resetLine = () => {
    this.setState({ points: EmittedLine.initialPoints });
  };

  beginLineInterval = () => {
    this.emittedLineInterval = setInterval(() => {
      const { points } = this.state;
      const {
        chargeOscillation: { x, y },
        angle,
        emittedLineStepSize,
        maxPointsForLines,
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
      // keeps only the maxPointsForLine first points, sufficient to fill screen
      newPoints = [0, 0, x, y, ...newPoints].slice(0, maxPointsForLines);
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
