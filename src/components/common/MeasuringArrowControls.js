import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { postAction, setMeasuringArrowWidth } from '../../actions';
import {
  MIN_MEASURING_ARROW_WIDTH,
  MAX_MEASURING_ARROW_WIDTH,
  MEASURING_ARROW_STEP,
  MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR,
  PAUSED_STRING,
  PLAYING_STRING,
} from '../../config/constants';
import {
  DECREASED_MEASURING_ARROW_WIDTH,
  INCREASED_MEASURING_ARROW_WIDTH,
} from '../../config/verbs';

const MeasuringArrowControls = () => {
  const measuringArrow = useSelector(({ layout }) => layout.lab.measuringArrow);
  const measuringArrowWidth = useSelector(
    ({ layout }) => layout.lab.measuringArrowWidth,
  );
  const isPaused = useSelector(({ layout }) => layout.lab.isPaused);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const applicationState = isPaused ? PAUSED_STRING : PLAYING_STRING;

  const increaseWidth = () => {
    const newWidth = measuringArrowWidth + MEASURING_ARROW_STEP;
    dispatch(setMeasuringArrowWidth(newWidth));
    dispatch(
      postAction({
        verb: INCREASED_MEASURING_ARROW_WIDTH,
        data: {
          newWidth: `${
            newWidth * MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR
          }nm`,
          applicationState,
        },
      }),
    );
  };

  const decreaseWidth = () => {
    const newWidth = measuringArrowWidth - MEASURING_ARROW_STEP;
    dispatch(setMeasuringArrowWidth(newWidth));
    dispatch(
      postAction({
        verb: DECREASED_MEASURING_ARROW_WIDTH,
        data: {
          newWidth: `${
            newWidth * MEASURING_ARROW_UNITS_TO_NANOMETER_CONVERSION_FACTOR
          }nm`,
          applicationState,
        },
      }),
    );
  };

  return (
    <div>
      <Tooltip title={t('Decrease arrow width')}>
        <span>
          <IconButton
            onClick={decreaseWidth}
            disabled={
              !measuringArrow ||
              measuringArrowWidth === MIN_MEASURING_ARROW_WIDTH
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
        </span>
      </Tooltip>
      <Tooltip title={t('Increase arrow width')}>
        <span>
          <IconButton
            onClick={increaseWidth}
            disabled={
              !measuringArrow ||
              measuringArrowWidth === MAX_MEASURING_ARROW_WIDTH
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
        </span>
      </Tooltip>
    </div>
  );
};

export default MeasuringArrowControls;
