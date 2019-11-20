const googleAnalyticsFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'google_analytics_email',
            label: 'Email Address',
            validators: ['required', 'email'],
        },{
            type: 'password',
            id: 'google_analytics_password',
        },{
            type: 'radioToggle',
            label: 'Does your account have two-factor authentication (2FA) enabled?',
            fields: [
                {
                    type: 'text',
                    id: 'google_analytics_2fa_name',
                    label: 'Name of person responsible for 2FA',
                    validators: ['required'],
                },{
                    type: 'text',
                    id: 'google_analytics_2fa_email',
                    label: 'Email of person responsible for 2FA',
                    validators: ['required', 'email'],
                }
            ],
        }
    ],
};

export {
    googleAnalyticsFormFields,
};