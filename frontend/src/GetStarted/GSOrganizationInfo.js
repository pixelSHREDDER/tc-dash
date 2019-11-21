import React from 'react';
import GSForm from '../Forms/GSForm';
import { mailingAddressFormFields } from '../OrganizationInfo/OrganizationInfoFormFields';

const questionGroups = [
  {
    title: 'The Basics',
    questions: [
      {
        type: 'text',
        label: 'What\'s your organization\'s full name?',
        description: 'For official business purposes (and for the holiday cards).',
        validators: ['required'],
      },
      {
        type: 'text',
        label: 'What\'s your organization\'s tagline?',
        description: 'It could be a slogan, a catchphrase, or just a brief description.',
        validators: ['required'],
      },
      /*{
        type: 'select',
        label: 'What type of organization is this?',
        validators: ['required'],
      },
      {
        type: 'phone',
        label: 'Does your organization have a phone number?',
        description: 'Office numbers only please!',
      },*/
    ],
  },
  {
    title: 'Mailing Address',
    questions: mailingAddressFormFields,
  },
];

class GSOrganizationInfo extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSOrganizationInfo;