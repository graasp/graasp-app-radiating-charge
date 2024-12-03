import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

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

const CustomSwitch = ({ switchStatus, switchAction, switchLabel }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const Control = (
    <Switch
      checked={switchStatus}
      onChange={() => dispatch(switchAction(!switchStatus))}
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
  switchAction: PropTypes.func.isRequired,
  switchLabel: PropTypes.string.isRequired,
};

export default CustomSwitch;
