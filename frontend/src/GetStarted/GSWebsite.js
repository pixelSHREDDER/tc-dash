import React from 'react';
import GSForm from '../Forms/GSForm';
import { oldWebsiteFormFields } from '../Website/WebsiteFormFields';

const questionGroups = [
  {
    title: 'Old Website',
    questions: [
      {
        type: 'radioToggle',
        label: 'Do you currently have a website you want data migrated from?',
        fields: oldWebsiteFormFields,
      },
    ],
  },
  {
    title: 'New Website',
    questions: [
      {
        type: 'rankedChoices',
        name: 'domain_choices',
        label: 'What would you like your new website\'s domain name to be?',
        description: 'Please enter 3 choices in order of preference, and we\'ll try our best to snag one of them for you!',
        choiceCount: 3,
        validators: ['required', 'url'],
      },
    ],
  },
];

function GSWebsite(props) { return <GSForm questionGroups={questionGroups} />; }

export default GSWebsite;