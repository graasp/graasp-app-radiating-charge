import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  switch: {
    marginLeft: theme.spacing(7),
  },
}));

const CustomSwitch = ({ switchStatus, switchDispatch, switchLabel }) => {
  const classes = useStyles();

  const onSwitchToggle = () => {
    switchDispatch(!switchStatus);
  };

  const control = (
    <Switch
      checked={switchStatus}
      onChange={onSwitchToggle}
      name={switchLabel}
      color="primary"
      className={classes.switch}
    />
  );

  return (
    <FormControlLabel
      className={classes.wrapper}
      control={control}
      label={<Typography variant="body2">{switchLabel}</Typography>}
      labelPlacement="start"
    />
  );
};

CustomSwitch.propTypes = {
  switchStatus: PropTypes.bool.isRequired,
  switchDispatch: PropTypes.func.isRequired,
  switchLabel: PropTypes.string.isRequired,
};

export default CustomSwitch;
