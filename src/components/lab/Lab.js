import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle, Text } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
import EmittedLine from './EmittedLine';
import {
  BACKGROUND_COLOR,
  CHARGE_COLOR,
  CHARGE_RADIUS,
  CHARGE_SYMBOL,
  CHARGE_SYMBOL_FONT_SIZE,
  CHARGE_SYMBOL_COLOR,
  UPWARDS_DIRECTION,
  DOWNWARDS_DIRECTION,
  LINE_STEP_SIZE,
  SET_INTERVAL_TIME,
  generateAngles,
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
    numberOfLines: PropTypes.number.isRequired,
    frequencyAdjustmentFactor: PropTypes.number.isRequired,
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
    renderCount: 0,
    emittedLineStepSize: LINE_STEP_SIZE,
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
      const {
        shouldOscillate,
        amplitude,
        frequencyAdjustmentFactor,
      } = this.props;
      const {
        chargeOscillation: { y },
        direction,
        renderCount,
      } = this.state;

      const x = 0;
      let newY = y;
      let newDirection = direction;
      let renderCountIncrement = 1;

      if (shouldOscillate) {
        // acceleration
        const delta = frequencyAdjustmentFactor * renderCount;

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

        // flip directions as soon as charge passes amplitude threshold
        if (direction === DOWNWARDS_DIRECTION && newY >= amplitude) {
          newDirection = UPWARDS_DIRECTION;
          renderCountIncrement = -1 * renderCount;
        } else if (direction === UPWARDS_DIRECTION && newY <= -amplitude) {
          newDirection = DOWNWARDS_DIRECTION;
          renderCountIncrement = -1 * renderCount;
        }

        this.setState({
          chargeOscillation: { y: newY, x },
          direction: newDirection,
          renderCount: renderCount + renderCountIncrement,
          emittedLineStepSize: LINE_STEP_SIZE + delta,
        });
      }
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

  // element position should consider header height
  render() {
    const { numberOfLines, classes } = this.props;
    const {
      stageWidth,
      stageHeight,
      charge,
      chargeOscillation,
      emittedLineStepSize,
    } = this.state;

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
            {generateAngles(numberOfLines).map((angle) => (
              <EmittedLine
                charge={charge}
                chargeOscillation={chargeOscillation}
                angle={angle}
                emittedLineStepSize={emittedLineStepSize}
                key={angle}
              />
            ))}
            <Circle
              x={charge.x + chargeOscillation.x}
              y={charge.y + chargeOscillation.y}
              radius={CHARGE_RADIUS}
              fill={CHARGE_COLOR}
              draggable
            />
            <Text
              // x and y coordinates adjusted manually to approximately center the + in the Circle given its fontSize
              x={charge.x + chargeOscillation.x - (CHARGE_RADIUS / 2 + 0.75)}
              y={charge.y + chargeOscillation.y - (CHARGE_RADIUS + 0.5)}
              text={CHARGE_SYMBOL}
              fontSize={CHARGE_SYMBOL_FONT_SIZE}
              fill={CHARGE_SYMBOL_COLOR}
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
  numberOfLines: parseInt(layout.lab.numberOfLines, 10),
  frequencyAdjustmentFactor: layout.lab.frequencyAdjustmentFactor,
});

const ConnectedComponent = connect(mapStateToProps, null)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
