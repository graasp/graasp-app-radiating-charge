import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { postAction } from '../../actions';
import { PAUSED_STRING, PLAYING_STRING } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'space-between',
    width: '55%',
  },
  label: {
    display: 'block',
  },
}));

const CustomSwitch = ({
  switchStatus,
  switchDispatch,
  switchLabel,
  toggleOffAction,
  toggleOnAction,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPaused = useSelector(({ layout }) => layout.lab.isPaused);
  const applicationState = isPaused ? PAUSED_STRING : PLAYING_STRING;

  const onSwitchToggle = () => {
    dispatch(
      postAction({
        verb: switchStatus === true ? toggleOffAction : toggleOnAction,
        data: { applicationState },
      }),
      switchDispatch(!switchStatus),
    );
  };

  const Control = (
    <Switch
      checked={switchStatus}
      onChange={onSwitchToggle}
      name={switchLabel}
      color="primary"
    />
  );

  const Label = (
    <Typography variant="body2" className={classes.label}>
      {switchLabel}
    </Typography>
  );

  return (
    <FormControlLabel
      className={classes.wrapper}
      control={Control}
      label={Label}
      labelPlacement="start"
    />
  );
};

CustomSwitch.propTypes = {
  switchStatus: PropTypes.bool.isRequired,
  switchDispatch: PropTypes.func.isRequired,
  switchLabel: PropTypes.string.isRequired,
  toggleOffAction: PropTypes.string,
  toggleOnAction: PropTypes.string,
};

CustomSwitch.defaultProps = {
  toggleOffAction: '',
  toggleOnAction: '',
};

export default CustomSwitch;
