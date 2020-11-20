/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Line } from 'react-konva';
import { MAX_POINTS_FOR_LINES, STROKE_COLOR } from '../../config/constants';

export default class EmittedLine extends Component {
  state = {
    points: [0, 0],
  };

  componentDidMount() {
    setInterval(() => {
      const { points } = this.state;
      const {
        chargeOscillation: { x, y },
        direction,
      } = this.props;

      // move points to direction
      let newPoints = points
        .slice(2)
        .map((value, i) =>
          i % 2 === 0 ? value + direction[0] : value + direction[1],
        );

      // the first point is where the charge is
      // add second point where the oscillation should be
      // keeps only MAX_POINTS_FOR_LINES first points
      newPoints = [0, 0, x, y, ...newPoints].slice(0, MAX_POINTS_FOR_LINES);
      this.setState({
        points: newPoints,
      });
    }, 50);
  }

  render() {
    const {
      charge: { x, y },
    } = this.props;
    const { points } = this.state;
    return (
      <Line x={x} y={y} points={points} tension={0.5} stroke={STROKE_COLOR} />
    );
  }
}
