import React from 'react';
import GSForm from '../Forms/GSForm';
import { googleAnalyticsFormFields } from '../AnalyticsSEO/AnalyticsSEOFormFields';

const questionGroups = [
  {
    title: 'Google Analytics',
    questions: [
      {
        type: 'radioToggle',
        label: 'Do you already have a Google Analytics account?',
        description: 'We\'ll set one up for you if you don\'t!',
        fields: googleAnalyticsFormFields.existing,
      },
    ],
  },
];

class GSAnalyticsSEO extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSAnalyticsSEO;