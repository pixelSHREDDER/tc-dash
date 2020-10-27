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
        id: 'old_email',
        label: 'Do you have any existing email accounts you want to transfer over mail from?',
        description: '(Add adding more option, storing as array or object!)',
        fields: emailFormFields.existing,
      },
    ],
  },
  {
    title: 'Mailchimp',
    questions: [
      {
        type: 'radioToggle',
        id: 'mailchimp',
        label: 'Do you already have a Mailchimp account?',
        description: 'We\'ll set one up for you if you don\'t!',
        fields: mailchimpFormFields.existing,
      },
    ],
  },
];

class GSEmail extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSEmail;