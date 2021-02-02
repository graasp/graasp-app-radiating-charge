import React from 'react';
import PropTypes from 'prop-types';
import { Line, Group } from 'react-konva';
import {
  CHARGE_SYMBOL_HEIGHT_AND_WIDTH,
  CHARGE_SYMBOL_COLOR,
  CHARGE_SYMBOL_STROKE_WIDTH,
} from '../../config/constants';

const ChargeSymbol = ({ x, y }) => {
  return (
    <Group>
      <Line
        x={x - CHARGE_SYMBOL_HEIGHT_AND_WIDTH / 2}
        y={y}
        points={[0, 0, CHARGE_SYMBOL_HEIGHT_AND_WIDTH, 0]}
        stroke={CHARGE_SYMBOL_COLOR}
        strokeWidth={CHARGE_SYMBOL_STROKE_WIDTH}
      />
      <Line
        x={x}
        y={y - CHARGE_SYMBOL_HEIGHT_AND_WIDTH / 2}
        points={[0, 0, 0, CHARGE_SYMBOL_HEIGHT_AND_WIDTH]}
        stroke={CHARGE_SYMBOL_COLOR}
        strokeWidth={CHARGE_SYMBOL_STROKE_WIDTH}
      />
    </Group>
  );
};

ChargeSymbol.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default ChargeSymbol;
