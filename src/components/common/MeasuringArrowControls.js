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
  const { measuringArrow, measuringArrowWidth } = useSelector(({ lab }) => lab);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const increaseWidth = () => {
    const newWidth = measuringArrowWidth + MEASURING_ARROW_STEP;
    dispatch(setMeasuringArrowWidth(newWidth));
  };

  const decreaseWidth = () => {
    const newWidth = measuringArrowWidth - MEASURING_ARROW_STEP;
    dispatch(setMeasuringArrowWidth(newWidth));
  };

  return (
    <div>
      <Tooltip title={t('Decrease arrow width')}>
        <span>
          <IconButton
            onClick={decreaseWidth}
            disabled={
              !measuringArrow ||
              measuringArrowWidth <= MIN_MEASURING_ARROW_WIDTH
            }
          >
            <RemoveCircleOutlineIcon
              color={
                measuringArrow &&
                measuringArrowWidth > MIN_MEASURING_ARROW_WIDTH
                  ? 'secondary'
                  : 'disabled'
              }
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={t('Increase arrow width')}>
        <span>
          <IconButton
            onClick={increaseWidth}
            disabled={
              !measuringArrow ||
              measuringArrowWidth >= MAX_MEASURING_ARROW_WIDTH
            }
          >
            <AddCircleOutlineIcon
              color={
                measuringArrow &&
                measuringArrowWidth < MAX_MEASURING_ARROW_WIDTH
                  ? 'primary'
                  : 'disabled'
              }
            />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

export default MeasuringArrowControls;
