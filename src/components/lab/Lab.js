import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
import EmittedLine from './EmittedLine';
import {
  ANGLES,
  BACKGROUND_COLOR,
  CHARGE_COLOR,
  CHARGE_RADIUS,
  UPWARDS_DIRECTION,
  LINE_STEP_SIZE,
  DOWNWARDS_DIRECTION,
  SET_INTERVAL_TIME,
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
    shouldOscillate: PropTypes.bool.isRequired,
    amplitude: PropTypes.number.isRequired,
  };

  state = {
    stageWidth: 0,
    stageHeight: 0,
    // starting position of the charge
    charge: {
      x: 0,
      y: 0,
    },
    // direction charge is moving
    direction: DOWNWARDS_DIRECTION,
    chargeOscillation: { x: 0, y: 0 },
  };

  componentDidMount() {
    this.checkSize();
    // here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    const ro = new ResizeObserver(() => {
      this.checkSize();
    });
    ro.observe(document.querySelector(`#container`));

    // animation
    setInterval(() => {
      const { shouldOscillate, amplitude } = this.props;

      const {
        chargeOscillation: { y },
        direction,
      } = this.state;

      const x = 0;
      let newY = y;
      let newDirection = direction;

      if (shouldOscillate) {
        // flip directions as soon as charge passes amplitude threshold
        if (direction === DOWNWARDS_DIRECTION && y >= amplitude) {
          newDirection = UPWARDS_DIRECTION;
        } else if (direction === UPWARDS_DIRECTION && y <= -amplitude) {
          newDirection = DOWNWARDS_DIRECTION;
        }

        // if the charge moves slower than the lines are drawn,
        // then you can see a better effect of the field
        const CHARGE_STEP_SIZE = LINE_STEP_SIZE / 2;

        // minimum step of charge moving to avoid slow acceleration models
        const MIN_STEP_SIZE = 0.5;

        // acceleration function (faster closer to the origin)
        const delta =
          CHARGE_STEP_SIZE *
          Math.max(
            -Math.log(Math.max(Math.min(Math.abs(y) / amplitude, 1), 0.01)),
            MIN_STEP_SIZE,
          );
        switch (direction) {
          case DOWNWARDS_DIRECTION:
            newY += delta;
            break;
          case UPWARDS_DIRECTION:
            newY -= delta;
            break;
          default:
          // do nothing
        }
      }
      this.setState({
        chargeOscillation: { y: newY, x },
        direction: newDirection,
      });
    }, SET_INTERVAL_TIME);
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
    const { stageWidth, stageHeight, charge, chargeOscillation } = this.state;

    return (
      <div
        id="container"
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
            {ANGLES.map((angle) => [
              <EmittedLine
                charge={charge}
                chargeOscillation={chargeOscillation}
                angle={angle}
              />,
            ])}
            <Circle
              x={charge.x + chargeOscillation.x}
              y={charge.y + chargeOscillation.y}
              radius={CHARGE_RADIUS}
              fill={CHARGE_COLOR}
              draggable
              onDragMove={this.onChargeDragMove}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  shouldOscillate: layout.lab.oscillation,
  amplitude: layout.lab.amplitude,
});

const ConnectedComponent = connect(mapStateToProps, null)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
