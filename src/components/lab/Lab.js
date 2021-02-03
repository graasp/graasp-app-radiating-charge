import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
import EmittedLine from './EmittedLine';
import Grid from './Grid';
import ChargeSymbol from './ChargeSymbol';
import MeasuringArrow from './MeasuringArrow';
import SpectrumBar from './SpectrumBar';
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
  SET_INTERVAL_TIME,
  LINE_STEP_SIZE,
  generateAngles,
  MAX_POINTS_FOR_LINES,
} from '../../config/constants';
import {
  calculateYPositionHarmonically,
  calculateDiagonalLength,
} from '../../utils/physics';

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
    measuringArrow: PropTypes.bool.isRequired,
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
    measuringArrowWidth: PropTypes.number.isRequired,
    spectrumBar: PropTypes.bool.isRequired,
  };

  state = {
    emittedLineStepSize: LINE_STEP_SIZE,
    maxPointsForLines: MAX_POINTS_FOR_LINES,
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

    // based on screen dimensions, calculate the number of points needed for emitted lines to fill the screen
    // keep in mind that lines are drawn from an array [(origin, origin), (0, 0), (pt1x, pt1y), (pt2x, pt2y), ...]
    // the longest possible line is the diagonal; hence, the number of points needed for the diagonal are calculated
    // this number is used for all lines (overshoots for some lines, but this is ok, as excess points are outside the screen)
    const quadrantDiagonalLength = calculateDiagonalLength(
      stageWidth / 2,
      stageHeight / 2,
    );

    // if diagonal length is e.g. 100, and distance between each point (LINE_STEP_SIZE) is 5, then you need 20 points to fill diagonal
    // since points are of the form (x, y), this means that the line array would need to contain 40 points (hence * 2)
    // add 4 since the first 4 points, i.e. (origin, origin) and (0, 0), do not contribute to length
    const quadrantDiagonalMaxPoints =
      (2 * quadrantDiagonalLength) / LINE_STEP_SIZE + 4;

    this.setState({
      maxPointsForLines: quadrantDiagonalMaxPoints,
    });
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
          y: calculateYPositionHarmonically(frequency, amplitude, elapsedTime),
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
      measuringArrow,
      numberOfLines,
      classes,
      isPaused,
      chargeOrigin,
      chargeOscillation,
      measuringArrowWidth,
      spectrumBar,
      frequency,
      shouldOscillate,
    } = this.props;
    const { emittedLineStepSize, maxPointsForLines } = this.state;

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
                maxPointsForLines={maxPointsForLines}
                // key={index} is necessary to ensure that all lines refresh when # of lines changes
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                isPaused={isPaused}
                numberOfLines={numberOfLines}
              />
            ))}
            {gridLines && (
              <Grid
                gridWidth={stageDimensions.width}
                gridHeight={stageDimensions.height}
              />
            )}
            {measuringArrow && (
              <MeasuringArrow
                measuringArrowWidth={measuringArrowWidth}
                stageWidth={stageDimensions.width}
                stageHeight={stageDimensions.height}
              />
            )}
            {spectrumBar && (
              <SpectrumBar
                frequency={frequency}
                stageWidth={stageDimensions.width}
                stageHeight={stageDimensions.height}
                shouldOscillate={shouldOscillate}
              />
            )}
            <Circle
              x={chargeOrigin.x + chargeOscillation.x}
              y={chargeOrigin.y + chargeOscillation.y}
              radius={CHARGE_RADIUS}
              fill={CHARGE_COLOR}
            />
            <ChargeSymbol
              x={chargeOrigin.x + chargeOscillation.x}
              y={chargeOrigin.y + chargeOscillation.y}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  gridLines: layout.lab.gridLines,
  measuringArrow: layout.lab.measuringArrow,
  measuringArrowWidth: layout.lab.measuringArrowWidth,
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
  spectrumBar: layout.lab.spectrumBar,
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
