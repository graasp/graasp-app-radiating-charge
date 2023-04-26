import React, { useEffect } from 'react';
import qs from 'qs';
import { useTranslation } from 'react-i18next';
import { Context, PermissionLevel } from '@graasp/sdk';
import { useLocalContext } from '@graasp/apps-query-client';
import StudentMode from './modes/student/StudentMode';
import { DEFAULT_LANG } from '../config/settings';
import TeacherMode from './modes/teacher/TeacherMode';

export const App = () => {
  const { i18n } = useTranslation();
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
  }, [context]);

  // eslint-disable-next-line react/destructuring-assignment
  const view = context?.context;
  // eslint-disable-next-line react/destructuring-assignment
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

export default App;
