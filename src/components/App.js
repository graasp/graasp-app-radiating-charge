import React, { useEffect } from 'react';
import qs from 'qs';
import { withTranslation } from 'react-i18next';
import { Context, PermissionLevel } from '@graasp/sdk';
import { useLocalContext } from '@graasp/apps-query-client';
import PropTypes from 'prop-types';
import StudentMode from './modes/student/StudentMode';
import { DEFAULT_LANG } from '../config/settings';
import TeacherMode from './modes/teacher/TeacherMode';

export const App = ({ i18n }) => {
  const { data: context } = useLocalContext();

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    // get lang from context or query string
    // necessary for standalone setting
    const { lang } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    const newLang = context?.lang || lang;
    // set the language on first load
    if (newLang !== i18n.language) {
      handleChangeLang(newLang || DEFAULT_LANG);
    }
  }, [context?.lang]);

  const view = context?.context;
  const permission = context?.permission;
  switch (view) {
    // show teacher view when in producer (educator) mode
    case Context.BUILDER:
      if (
        permission === PermissionLevel.Admin ||
        permission === PermissionLevel.Write
      ) {
        return <TeacherMode view={view} />;
      }
      return <StudentMode />;

    default:
      return <StudentMode />;
  }
};

App.propTypes = {
  i18n: PropTypes.shape({
    defaultNS: PropTypes.string,
    changeLanguage: PropTypes.func,
    language: PropTypes.string,
  }).isRequired,
};

export default withTranslation()(App);
