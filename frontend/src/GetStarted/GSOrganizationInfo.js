import React from 'react';
import GSForm from '../Forms/GSForm';
import { organizationMailingAddressFormFields } from '../OrganizationInfo/OrganizationInfoFormFields';

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
      {
        type: 'select',
        label: 'What type of organization are you?',
        options: {
          'county': 'Chapter (County)',
          'college': 'Chapter (College)',
          'high_school': 'Chapter (High School)',
          'caucus': 'Caucus',
        },
        validators: ['required'],
      },
    ],
  },
  {
    title: 'Mailing Address',
    questions: organizationMailingAddressFormFields,
  },
  {
    title: 'Phone Number',
    questions: [
      {
        type: 'phone',
        label: 'What\'s your organization\'s phone number?',
        description: 'Can be either a landline or a board member\'s cellphone number (will be displayed publicly).',
        validators: ['required'],
      },
    ],
  },
];

class GSOrganizationInfo extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSOrganizationInfo;