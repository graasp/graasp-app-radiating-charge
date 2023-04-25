import React from 'react';
import PropTypes from 'prop-types';
import StudentView from './StudentView';
import { DEFAULT_VIEW, FEEDBACK_VIEW } from '../../../config/views';

// eslint-disable-next-line react/prefer-stateless-function
const StudentMode = ({ view }) => {
  switch (view) {
    case FEEDBACK_VIEW:
    case DEFAULT_VIEW:
    default:
      return <StudentView />;
  }
};

StudentMode.propTypes = {
  view: PropTypes.string,
};

StudentMode.defaultProps = {
  view: DEFAULT_VIEW,
};

export default StudentMode;
