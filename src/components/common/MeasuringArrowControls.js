import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { setMeasuringArrowWidth } from '../../actions';
import {
  MIN_MEASURING_ARROW_WIDTH,
  MAX_MEASURING_ARROW_WIDTH,
  MEASURING_ARROW_STEP,
} from '../../config/constants';

const MeasuringArrowControls = () => {
  const measuringArrow = useSelector(({ layout }) => layout.lab.measuringArrow);
  const measuringArrowWidth = useSelector(
    ({ layout }) => layout.lab.measuringArrowWidth,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const increaseWidth = () => {
    dispatch(
      setMeasuringArrowWidth(measuringArrowWidth + MEASURING_ARROW_STEP),
    );
  };

  const decreaseWidth = () => {
    dispatch(
      setMeasuringArrowWidth(measuringArrowWidth - MEASURING_ARROW_STEP),
    );
  };

  return (
    <div>
      <Tooltip title={t('Decrease arrow width')}>
        <IconButton
          onClick={decreaseWidth}
          disabled={
            !measuringArrow || measuringArrowWidth === MIN_MEASURING_ARROW_WIDTH
          }
        >
          <RemoveCircleOutlineIcon
            color={
              measuringArrow &&
              measuringArrowWidth !== MIN_MEASURING_ARROW_WIDTH
                ? 'secondary'
                : 'disabled'
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('Increase arrow width')}>
        <IconButton
          onClick={increaseWidth}
          disabled={
            !measuringArrow || measuringArrowWidth === MAX_MEASURING_ARROW_WIDTH
          }
        >
          <AddCircleOutlineIcon
            color={
              measuringArrow &&
              measuringArrowWidth !== MAX_MEASURING_ARROW_WIDTH
                ? 'primary'
                : 'disabled'
            }
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default MeasuringArrowControls;