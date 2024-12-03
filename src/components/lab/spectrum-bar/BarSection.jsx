import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';
import {
  BOTTOM_LABEL_INDENT,
  BOTTOM_LABEL_PADDING,
  LEFT_STRING,
  MAIN_LABEL_PADDING,
  MIDDLE_STRING,
  RIGHT_STRING,
  SPECTRUM_BAR_HEIGHT,
  SPECTRUM_BAR_LABELS_FONT_SIZE,
  SPECTRUM_BAR_LABEL_COLOR,
} from '../../../config/constants';

const BarSection = ({
  x,
  gradientFill,
  sectionWidth,
  mainLabel,
  labelAlign,
  bottomLabel,
}) => {
  const sectionHeight = SPECTRUM_BAR_HEIGHT;
  const mainLabelPadding = MAIN_LABEL_PADDING * sectionWidth;
  const bottomLabelPadding = BOTTOM_LABEL_PADDING * sectionWidth;

  const findBottomLabelPadding = (bottomLabelAlign) => {
    if (bottomLabelAlign === LEFT_STRING) {
      return -bottomLabelPadding;
    }
    if (bottomLabelAlign === RIGHT_STRING) {
      return bottomLabelPadding;
    }
    return 0;
  };

  return (
    <Group x={x}>
      <Rect
        height={sectionHeight}
        width={sectionWidth}
        fillLinearGradientEndPoint={{
          x: sectionWidth,
        }}
        fillLinearGradientColorStops={gradientFill}
      />
      <Text
        text={mainLabel}
        fill={SPECTRUM_BAR_LABEL_COLOR}
        height={sectionHeight}
        width={sectionWidth}
        verticalAlign={MIDDLE_STRING}
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        align={labelAlign}
        x={labelAlign === LEFT_STRING ? mainLabelPadding : -mainLabelPadding}
      />
      <Text
        text={bottomLabel}
        y={sectionHeight + BOTTOM_LABEL_INDENT}
        width={sectionWidth}
        align={labelAlign}
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        x={findBottomLabelPadding(labelAlign)}
      />
    </Group>
  );
};

BarSection.propTypes = {
  x: PropTypes.number,
  gradientFill: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  sectionWidth: PropTypes.number.isRequired,
  mainLabel: PropTypes.string,
  labelAlign: PropTypes.string,
  bottomLabel: PropTypes.string,
};

BarSection.defaultProps = {
  x: 0,
  mainLabel: '',
  labelAlign: LEFT_STRING,
  bottomLabel: '',
};

export default BarSection;
