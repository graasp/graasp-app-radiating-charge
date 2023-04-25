import React from 'react';
import PropTypes from 'prop-types';
import TeacherView from './TeacherView';
import { DEFAULT_VIEW, DASHBOARD_VIEW } from '../../../config/views';

// eslint-disable-next-line react/prefer-stateless-function
const TeacherMode = ({ view }) => {
  switch (view) {
    case DASHBOARD_VIEW:
    case DEFAULT_VIEW:
    default:
      return <TeacherView />;
  }
};

TeacherMode.propTypes = {
  view: PropTypes.string,
};

TeacherMode.defaultProps = {
  view: DEFAULT_VIEW,
};

export default TeacherMode;
