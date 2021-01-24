import React from 'react';
import GSForm from '../Forms/GSForm';
import { bylawsConstitutionFormFields } from '../BylawsConstitution/BylawsConstitutionFormFields';

const questionGroups = [
  ...bylawsConstitutionFormFields,
];

function GSWebsite(props) { return <GSForm questionGroups={questionGroups} />; }

export default GSWebsite;