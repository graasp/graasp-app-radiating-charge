import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
import EmittedLine from './EmittedLine';
import {
  BACKGROUND_COLOR,
  CHARGE_COLOR,
  CHARGE_RADIUS,
  DELTA_VALUE,
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

const DIRECTION_VALUE = 4;

class Lab extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      stage: PropTypes.string.isRequired,
    }).isRequired,
    stop: PropTypes.bool.isRequired,
    amplitude: PropTypes.number.isRequired,
  };

  state = {
    stageWidth: 0,
    stageHeight: 0,
    charge: {
      x: 0,
      y: 0,
    },
    angle: 0,
    delta: 0.7,
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
      const { stop, amplitude } = this.props;
      const { angle, delta } = this.state;

      // next x and y position of charge
      const x = Math.cos(angle) * amplitude;
      const y = 0;

      // delta used to update the angle
      let newDelta = delta;
      let newAngle = angle;
      if (!stop) {
        newAngle += delta;
        newDelta = delta >= DELTA_VALUE ? DELTA_VALUE : -DELTA_VALUE;
      }
      this.setState({
        angle: newAngle,
        delta: newDelta,
        chargeOscillation: { x, y },
      });
    }, 50);
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
            <EmittedLine
              charge={charge}
              chargeOscillation={chargeOscillation}
              direction={[0, DIRECTION_VALUE]}
            />
            <EmittedLine
              charge={charge}
              chargeOscillation={chargeOscillation}
              direction={[0, -DIRECTION_VALUE]}
            />
            <EmittedLine
              charge={charge}
              chargeOscillation={chargeOscillation}
              direction={[-DIRECTION_VALUE, 0]}
            />
            <EmittedLine
              charge={charge}
              chargeOscillation={chargeOscillation}
              direction={[DIRECTION_VALUE, 0]}
            />
            <EmittedLine
              charge={charge}
              chargeOscillation={chargeOscillation}
              direction={[DIRECTION_VALUE, -DIRECTION_VALUE]}
            />
            <EmittedLine
              charge={charge}
              chargeOscillation={chargeOscillation}
              direction={[-DIRECTION_VALUE, DIRECTION_VALUE]}
            />
            <EmittedLine
              charge={charge}
              chargeOscillation={chargeOscillation}
              direction={[-DIRECTION_VALUE, -DIRECTION_VALUE]}
            />
            <EmittedLine
              charge={charge}
              chargeOscillation={chargeOscillation}
              direction={[DIRECTION_VALUE, DIRECTION_VALUE]}
            />
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
  stop: layout.lab.stop,
  amplitude: layout.lab.amplitude,
});

const ConnectedComponent = connect(mapStateToProps, null)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
