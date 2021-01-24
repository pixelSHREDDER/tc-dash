import React from 'react';
import GSForm from '../Forms/GSForm';
import {
  emailFormFields,
  mailchimpFormFields
} from '../Email/EmailFormFields';

const questionGroups = [
  {
    title: 'Existing Email Accounts',
    questions: [
      {
        type: 'radioToggle',
        label: 'Do you have any existing email accounts you want to transfer over mail from?',
        description: '(Add adding more option, storing as object of objects with email address as key!)',
        fields: emailFormFields.existing,
      },
    ],
  },
  {
    title: 'Mailchimp',
    questions: [
      {
        type: 'radioToggle',
        label: 'Do you already have a Mailchimp account?',
        description: 'We\'ll set one up for you if you don\'t!',
        fields: mailchimpFormFields.existing,
      },
    ],
  },
];

function GSEmail(props) { return <GSForm questionGroups={questionGroups} />; }

export default GSEmail;