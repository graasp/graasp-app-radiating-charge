import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle, Text } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
import EmittedLine from './EmittedLine';
import Grid from './Grid';
import {
  BACKGROUND_COLOR,
  CHARGE_COLOR,
  CHARGE_RADIUS,
  CHARGE_SYMBOL,
  CHARGE_SYMBOL_FONT_SIZE,
  CHARGE_SYMBOL_COLOR,
  SET_INTERVAL_TIME,
  LINE_STEP_SIZE,
  NUM_OF_X_AXIS_TICKS,
  generateAngles,
} from '../../config/constants';
import { calculateYpositionHarmonically } from '../../utils/physics';

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
    gridLines: PropTypes.bool.isRequired,
    shouldOscillate: PropTypes.bool.isRequired,
    amplitude: PropTypes.number.isRequired,
    numberOfLines: PropTypes.number.isRequired,
    frequency: PropTypes.number.isRequired,
  };

  state = {
    stageWidth: 0,
    stageHeight: 0,
    // starting position of the charge
    charge: {
      x: 0,
      y: 0,
    },
    chargeOscillation: { x: 0, y: 0 },
    emittedLineStepSize: LINE_STEP_SIZE,
    timerCount: 1,
    elapsedTime: 0,
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
      const { shouldOscillate, frequency, amplitude } = this.props;
      const { elapsedTime, timerCount } = this.state;

      if (shouldOscillate) {
        this.setState({
          chargeOscillation: {
            y: calculateYpositionHarmonically(
              frequency,
              amplitude,
              elapsedTime,
            ),
            x: 0,
          },
          elapsedTime: SET_INTERVAL_TIME * timerCount,
          timerCount: timerCount + 1,
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
    this.updateChargePosition(stageWidth / 2, stageHeight / 2);
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
    const { gridLines, numberOfLines, classes } = this.props;
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
            />
            <Text
              // x and y coordinates adjusted manually to approximately center the + in the Circle given its fontSize
              x={charge.x + chargeOscillation.x - (CHARGE_RADIUS / 2 + 0.75)}
              y={charge.y + chargeOscillation.y - (CHARGE_RADIUS + 0.5)}
              text={CHARGE_SYMBOL}
              fontSize={CHARGE_SYMBOL_FONT_SIZE}
              fill={CHARGE_SYMBOL_COLOR}
            />
            {gridLines && (
              <Grid
                gridWidth={stageWidth}
                gridHeight={stageHeight}
                numOfxAxisTicks={NUM_OF_X_AXIS_TICKS}
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  gridLines: layout.lab.gridLines,
  shouldOscillate: layout.lab.oscillation,
  amplitude: layout.lab.amplitude,
  numberOfLines: parseInt(layout.lab.numberOfLines, 10),
  frequency: layout.lab.frequency,
});

const ConnectedComponent = connect(mapStateToProps, null)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
