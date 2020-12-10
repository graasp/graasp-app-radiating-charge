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

// class CustomSwitch extends Component {
//   static propTypes = {
//     oscillation: PropTypes.bool.isRequired,
//     dispatchToggleOscillation: PropTypes.func.isRequired,
//     t: PropTypes.func.isRequired,
//     classes: PropTypes.shape({
//       wrapper: PropTypes.string.isRequired,
//       switch: PropTypes.string.isRequired,
//     }).isRequired,
//   };

//   onChange = () => {
//     const { oscillation, dispatchToggleOscillation } = this.props;
//     dispatchToggleOscillation(!oscillation);
//   };

//   render() {
//     const { t, oscillation, classes } = this.props;
//     const el = (
//       <Switch
//         checked={oscillation}
//         onChange={this.onChange}
//         name={t('Oscillation')}
//         color="primary"
//         className={classes.switch}
//       />
//     );
//     return (
//       <div>
//         <FormControlLabel
//           className={classes.wrapper}
//           control={el}
//           label={<Typography variant="body2">{t('Oscillation')}</Typography>}
//           labelPlacement="start"
//         />
//         <AnimationControls />
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ layout }) => ({
//   oscillation: layout.lab.oscillation,
// });

// const mapDispatchToProps = {
//   dispatchToggleOscillation: toggleOscillation,
// };

// const ConnectedComponent = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(CustomSwitch);

// const StyledComponent = withStyles(styles, { withTheme: true })(
//   ConnectedComponent,
// );

export default CustomSwitch;
