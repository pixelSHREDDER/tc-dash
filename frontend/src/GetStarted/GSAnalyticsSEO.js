import React from 'react';
import GSForm from '../Forms/GSForm';
import {
  googleAnalyticsFormFields,
  googleSearchConsoleFormFields,
} from '../AnalyticsSEO/AnalyticsSEOFormFields';

const questionGroups = [
  {
    title: 'Google Analytics',
    questions: [
      {
        type: 'radioToggle',
        id: 'google_analytics',
        label: 'Do you already have a Google Analytics account?',
        description: 'We\'ll set one up for you if you don\'t!',
        fields: googleAnalyticsFormFields.existing,
      },
    ],
  },
  {
    title: 'Google Search Console',
    questions: [
      {
        type: 'radioToggle',
        id: 'google_search_console',
        label: 'Do you already have a Google Search Console account?',
        description: 'We\'ll set one up for you if you don\'t!',
        fields: googleSearchConsoleFormFields.existing,
      },
    ],
  },
];

class GSAnalyticsSEO extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSAnalyticsSEO;