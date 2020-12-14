import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle, Text } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
import EmittedLine from './EmittedLine';
import Grid from './Grid';
import {
  togglePause,
  setStageDimensions,
  setChargeOrigin,
  setChargeOscillation,
  setTimerCount,
  setElapsedTime,
} from '../../actions';
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
    isPaused: PropTypes.bool.isRequired,
    dispatchTogglePause: PropTypes.func.isRequired,
    timerCount: PropTypes.number.isRequired,
    elapsedTime: PropTypes.number.isRequired,
    dispatchSetChargeOscillation: PropTypes.func.isRequired,
    dispatchSetElapsedTime: PropTypes.func.isRequired,
    dispatchSetTimerCount: PropTypes.func.isRequired,
    dispatchSetChargeOrigin: PropTypes.func.isRequired,
    dispatchSetStageDimensions: PropTypes.func.isRequired,
    chargeOrigin: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    chargeOscillation: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    stageDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  state = {
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
    this.beginOscillationInterval();
  }

  componentDidUpdate(prevProps) {
    const { isPaused } = this.props;
    if (isPaused !== prevProps.isPaused && isPaused) {
      clearInterval(this.oscillationInterval);
    } else if (isPaused !== prevProps.isPaused && !isPaused) {
      this.beginOscillationInterval();
    }
  }

  checkSize = () => {
    const { dispatchSetStageDimensions } = this.props;
    const stageWidth = this.container?.offsetWidth;
    const stageHeight = this.container?.offsetHeight;
    dispatchSetStageDimensions({
      width: stageWidth,
      height: stageHeight,
    });
    this.updateChargePosition(stageWidth / 2, stageHeight / 2);
  };

  updateChargePosition = (x, y) => {
    const { dispatchSetChargeOrigin } = this.props;
    dispatchSetChargeOrigin({
      x,
      y,
    });
  };

  beginOscillationInterval = () => {
    this.oscillationInterval = setInterval(() => {
      const {
        shouldOscillate,
        frequency,
        amplitude,
        isPaused,
        timerCount,
        elapsedTime,
        dispatchSetChargeOscillation,
        dispatchSetElapsedTime,
        dispatchSetTimerCount,
      } = this.props;

      if (shouldOscillate && !isPaused) {
        dispatchSetChargeOscillation({
          y: calculateYpositionHarmonically(frequency, amplitude, elapsedTime),
          x: 0,
        });
        dispatchSetElapsedTime(SET_INTERVAL_TIME * timerCount);
        dispatchSetTimerCount(timerCount + 1);
      }
    }, SET_INTERVAL_TIME);
  };

  handleCanvasClick = () => {
    const { isPaused, dispatchTogglePause } = this.props;
    dispatchTogglePause(!isPaused);
  };

  // element position should consider header height
  render() {
    const {
      stageDimensions,
      gridLines,
      numberOfLines,
      classes,
      isPaused,
      chargeOrigin,
      chargeOscillation,
    } = this.props;
    const { emittedLineStepSize } = this.state;

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
          width={stageDimensions.width}
          height={stageDimensions.height}
          onClick={this.handleCanvasClick}
        >
          <Layer>
            {generateAngles(numberOfLines).map((angle, index) => (
              <EmittedLine
                charge={chargeOrigin}
                chargeOscillation={chargeOscillation}
                angle={angle}
                emittedLineStepSize={emittedLineStepSize}
                // key={index} is necessary to ensure that all lines refresh when # of lines changes
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                isPaused={isPaused}
              />
            ))}
            <Circle
              x={chargeOrigin.x + chargeOscillation.x}
              y={chargeOrigin.y + chargeOscillation.y}
              radius={CHARGE_RADIUS}
              fill={CHARGE_COLOR}
            />
            <Text
              // x and y coordinates adjusted manually to approximately center the + in the Circle given its fontSize
              x={
                chargeOrigin.x +
                chargeOscillation.x -
                (CHARGE_RADIUS / 2 + 0.75)
              }
              y={chargeOrigin.y + chargeOscillation.y - (CHARGE_RADIUS + 0.5)}
              text={CHARGE_SYMBOL}
              fontSize={CHARGE_SYMBOL_FONT_SIZE}
              fill={CHARGE_SYMBOL_COLOR}
            />
            {gridLines && (
              <Grid
                gridWidth={stageDimensions.width}
                gridHeight={stageDimensions.height}
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
  isPaused: layout.lab.isPaused,
  stageDimensions: layout.lab.stageDimensions,
  chargeOrigin: layout.lab.chargeOrigin,
  chargeOscillation: layout.lab.chargeOscillation,
  timerCount: layout.lab.timerCount,
  elapsedTime: layout.lab.elapsedTime,
});

const mapDispatchToProps = {
  dispatchSetStageDimensions: setStageDimensions,
  dispatchTogglePause: togglePause,
  dispatchSetChargeOrigin: setChargeOrigin,
  dispatchSetChargeOscillation: setChargeOscillation,
  dispatchSetTimerCount: setTimerCount,
  dispatchSetElapsedTime: setElapsedTime,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
