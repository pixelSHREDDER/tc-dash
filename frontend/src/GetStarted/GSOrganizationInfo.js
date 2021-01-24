import React from 'react';
import GSForm from '../Forms/GSForm';
import { organizationMailingAddressFormFields } from '../OrganizationInfo/OrganizationInfoFormFields';

const questionGroups = [
  {
    title: 'The Basics',
    questions: [
      {
        type: 'text',
        name: 'title',
        label: 'What\'s your organization\'s full name?',
        description: 'For official business purposes (and for the holiday cards).',
        validators: ['required'],
      },
      {
        type: 'text',
        name: 'description',
        label: 'What\'s your organization\'s tagline?',
        description: 'It could be a slogan, a catchphrase, or just a brief description.',
        validators: ['required'],
      },
      {
        type: 'select',
        name: 'instance_type',
        label: 'What type of organization are you?',
        options: {
          0: 'Chapter (County)',
          1: 'Chapter (College)',
          2: 'Chapter (High School)',
          3: 'Caucus',
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
        name: 'phone_number',
        label: 'What\'s your organization\'s phone number?',
        description: 'Can be either a landline or a board member\'s cellphone number (will be displayed publicly).',
        validators: ['required'],
      },
    ],
  },
];

function GSOrganizationInfo(props) { return <GSForm questionGroups={questionGroups} />; }

export default GSOrganizationInfo;