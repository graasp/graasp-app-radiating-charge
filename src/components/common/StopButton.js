import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';
import { toggleStop } from '../../actions';

class StopButton extends Component {
  propTypes = {
    stop: PropTypes.bool.isRequired,
    dispatchToogleStop: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  stop = () => {
    const { stop, dispatchToogleStop } = this.props;
    dispatchToogleStop(!stop);
  };

  render() {
    const { t, stop } = this.props;
    return (
      <Button variant="contained" onClick={this.stop} color="primary">
        {stop ? t('Start') : t('Stop')}
      </Button>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  stop: layout.lab.stop,
});

const mapDispatchToProps = {
  dispatchToogleStop: toggleStop,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopButton);

export default withTranslation()(ConnectedComponent);
