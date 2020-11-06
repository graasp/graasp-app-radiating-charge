import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle, Line } from 'react-konva';
import { withStyles } from '@material-ui/core/styles';
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
    const { stageWidth, stageHeight, charge } = this.state;

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
            <Line
              x={charge.x}
              y={charge.y}
              points={[0, 0, 500, 500]}
              tension={0.5}
              stroke={STROKE_COLOR}
            />
            <Line
              x={charge.x}
              y={charge.y}
              points={[0, 0, 0, -500]}
              tension={0.5}
              stroke={STROKE_COLOR}
            />
            <Circle
              x={charge.x}
              y={charge.y}
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

export default withStyles(styles, { withTheme: true })(Lab);
