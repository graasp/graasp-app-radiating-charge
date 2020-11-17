import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
import { Spring, animated, config } from 'react-spring/konva';
import {
  BACKGROUND_COLOR,
  CHARGE_COLOR,
  CHARGE_RADIUS,
  STROKE_COLOR,
} from '../../config/constants';

const styles = () => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: BACKGROUND_COLOR,
  },
  stage: {
    position: 'absolute',
  },
});

class Lab extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      stage: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    stageWidth: 0,
    stageHeight: 0,
    charge: {
      x: 0,
      y: 0,
    },
    oscillate: false,
  };

  componentDidMount() {
    const { classes } = this.props;
    this.checkSize();
    // here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    const ro = new ResizeObserver(() => {
      this.checkSize();
    });
    ro.observe(document.querySelector(`.${classes.container}`));
  }

  checkSize = () => {
    const stageWidth = this.container?.offsetWidth;
    const stageHeight = this.container?.offsetHeight;
    this.setState({
      stageHeight,
      stageWidth,
    });
    this.updateChargePosition(
      stageWidth / 2 - CHARGE_RADIUS,
      stageHeight / 2 - CHARGE_RADIUS,
    );
  };

  updateChargePosition = (x, y) => {
    this.setState({
      charge: {
        x,
        y,
      },
    });
  };

  onChargeDragMove = (e) => {
    const { x, y } = e.target.attrs;
    this.updateChargePosition(x, y);
  };

  // element position should consider header height
  render() {
    const { classes } = this.props;
    const { stageWidth, stageHeight, charge, oscillate } = this.state;

    // oscillation
    const chargeOscillation = 100;

    // undisturbed lines
    const l1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const l2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // todo: calculate these
    // observed lines
    const l1Observed = [0, 0, 10, -50, -10, -100, 10, -150, -10, -200, 0, -500];
    const l2Observed = [0, 0, 10, 50, 10, 100, 100, 150, 100, 200, 500, 500];

    return (
      <div
        className={classes.container}
        ref={(node) => {
          this.container = node;
        }}
      >
        <Stage
          className={classes.stage}
          width={stageWidth}
          height={stageHeight}
        >
          <Layer>
            <Spring
              from={{
                points: l1,
                y: charge.y,
              }}
              to={{
                points: l1Observed,
                y: charge.y + chargeOscillation,
              }}
              config={config.molasses}
              loop
              // only disable y animation
              immediate={(key) => key === 'y' && !oscillate}
            >
              {(props) => {
                return (
                  <animated.Line
                    x={charge.x}
                    y={props.y}
                    points={props.points}
                    tension={0.5}
                    stroke={STROKE_COLOR}
                  />
                );
              }}
            </Spring>
            <Spring
              from={{
                points: l2,
                y: charge.y,
              }}
              to={{
                points: l2Observed,
                y: charge.y + chargeOscillation,
              }}
              config={config.molasses}
              loop
              // only disable y animation
              immediate={(key) => key === 'y' && !oscillate}
            >
              {(props) => {
                return (
                  <animated.Line
                    x={charge.x}
                    y={props.y}
                    points={props.points}
                    tension={0.5}
                    stroke={STROKE_COLOR}
                  />
                );
              }}
            </Spring>
            <Spring
              from={{ y: charge.y }}
              to={{ y: charge.y + 100 }}
              config={config.molasses}
              loop
              // only disable y animation
              immediate={(key) => key === 'y' && !oscillate}
            >
              {(props) => (
                <animated.Circle
                  x={charge.x}
                  y={props.y}
                  radius={CHARGE_RADIUS}
                  fill={CHARGE_COLOR}
                  // draggable
                  onDragMove={this.onChargeDragMove}
                />
              )}
            </Spring>
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Lab);
