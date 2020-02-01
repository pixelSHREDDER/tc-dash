import React from 'react';
import GSForm from '../Forms/GSForm';
import { bylawsConstitutionFormFields } from '../BylawsConstitution/BylawsConstitutionFormFields';

const questionGroups = [
  ...bylawsConstitutionFormFields,
];

class GSWebsite extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSWebsite;