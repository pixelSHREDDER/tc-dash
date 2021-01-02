import React from 'react';
import GSForm from '../Forms/GSForm';
import { payPalFormFields } from '../PaymentsFinances/PaymentsFinancesFormFields';

const questionGroups = [
  {
    title: 'PayPal',
    questions: [
      {
        type: 'radioToggle',
        label: 'Do you already have a PayPal business account?',
        description: 'We\'ll set one up for you if you don\'t!',
        fields: payPalFormFields.existing,
      },
    ],
  },
];

class GSPaymentsFinances extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSPaymentsFinances;