const emailFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'email_address',
            label: 'Email address',
            validators: ['required', 'email'],
        },{
            type: 'text',
            id: 'forwarding_position',
            label: 'Whom should we forward incoming mail to? (replace me with Board select)',
            validators: ['required'],
        },{
            type: 'password',
            id: 'email_password',
            label: 'Email account password',
            validators: ['required'],
        },
    ],
};
const mailchimpFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'mailchimp_username',
            label: 'Username',
            validators: ['required'],
        },{
            type: 'password',
            id: 'mailchimp_password',
            label: 'Password',
            validators: ['required'],
        },
        {
            type: 'radioToggle',
            label: 'Do you use two-factor authentication?',
            fields: [
                {
                    type: 'text',
                    id: 'mailchimp_two_factor_name',
                    label: 'Name of person responsible for two-factor authentication',
                    validators: ['required'],
                },{
                    type: 'text',
                    id: 'mailchimp_two_factor_email_address',
                    label: 'Email address to contact person responsible for two-factor authentication',
                    validators: ['required', 'email'],
                },
            ],
          },
    ],
};

export {
    emailFormFields,
    mailchimpFormFields,
};