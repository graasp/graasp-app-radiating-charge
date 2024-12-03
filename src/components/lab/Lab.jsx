import React, { Component } from 'react';
import { ReactReduxContext, connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
import EmittedLine from './EmittedLine';
import Grid from './Grid';
import ChargeSymbol from './ChargeSymbol';
import MeasuringArrow from './MeasuringArrow';
import SpectrumBar from './SpectrumBar';
import { setStageDimensions, setChargeOrigin } from '../../actions';
import {
  BACKGROUND_COLOR,
  CHARGE_COLOR,
  CHARGE_RADIUS,
  generateAngles,
  DEFAULT_NUMBER_OF_LINES,
} from '../../config/constants';
import { calculateChargeY } from '../../utils/physics';

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
    frequency: PropTypes.number.isRequired,
    amplitude: PropTypes.number.isRequired,
    intervalCount: PropTypes.number.isRequired,
    dispatchSetChargeOrigin: PropTypes.func.isRequired,
    dispatchSetStageDimensions: PropTypes.func.isRequired,
    chargeOrigin: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    stageDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    spectrumBar: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.checkSize();
    // here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    const ro = new ResizeObserver(() => {
      this.checkSize();
    });
    ro.observe(document.querySelector(`#container`));
  }

  checkSize = () => {
    const { dispatchSetStageDimensions } = this.props;
    const stageWidth = this.container?.offsetWidth || 0;
    const stageHeight = this.container?.offsetHeight || 0;
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

  render() {
    const {
      stageDimensions,
      gridLines,
      measuringArrow,
      classes,
      chargeOrigin,
      spectrumBar,
      frequency,
      intervalCount,
      amplitude,
    } = this.props;

    const chargeY = calculateChargeY(frequency, amplitude, intervalCount);
    const angles = generateAngles(DEFAULT_NUMBER_OF_LINES);

    return (
      <div
        id="container"
        className={classes.container}
        ref={(node) => {
          this.container = node;
        }}
      >
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Stage
              className={classes.stage}
              width={stageDimensions.width}
              height={stageDimensions.height}
            >
              <Provider store={store}>
                <Layer>
                  {angles.map((angle, index) => (
                    <EmittedLine
                      intervalCount={intervalCount}
                      angle={angle}
                      x={chargeOrigin.x}
                      y={chargeOrigin.y}
                      frequency={frequency}
                      amplitude={amplitude}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
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
                      stageWidth={stageDimensions.width}
                      stageHeight={stageDimensions.height}
                    />
                  )}
                  {spectrumBar && <SpectrumBar frequency={frequency} />}
                  <Circle
                    fill={CHARGE_COLOR}
                    radius={CHARGE_RADIUS}
                    x={chargeOrigin.x}
                    y={chargeOrigin.y + chargeY}
                  />
                  <ChargeSymbol
                    x={chargeOrigin.x}
                    y={chargeOrigin.y + chargeY}
                  />
                </Layer>
              </Provider>
            </Stage>
          )}
        </ReactReduxContext.Consumer>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, lab }) => ({
  gridLines: lab.gridLines,
  measuringArrow: lab.measuringArrow,
  amplitude: lab.amplitude,
  frequency: lab.frequency,
  stageDimensions: layout.stageDimensions,
  chargeOrigin: lab.chargeOrigin,
  spectrumBar: lab.spectrumBar,
  intervalCount: lab.intervalCount,
  stageWidth: layout.stageDimensions.width,
  stageHeight: layout.stageDimensions.height,
});

const mapDispatchToProps = {
  dispatchSetStageDimensions: setStageDimensions,
  dispatchSetChargeOrigin: setChargeOrigin,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
