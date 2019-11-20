const payPalFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'paypal_email',
            label: 'Email Address',
            validators: ['required', 'email'],
        },{
            type: 'password',
            id: 'paypal_password',
        },{
            type: 'radioToggle',
            label: 'Does your account have two-factor authentication (2FA) enabled?',
            fields: [
                {
                    type: 'text',
                    id: 'paypal_2fa_name',
                    label: 'Name of person responsible for 2FA',
                    validators: ['required'],
                },{
                    type: 'text',
                    id: 'paypal_2fa_email',
                    label: 'Email of person responsible for 2FA',
                    validators: ['required', 'email'],
                }
            ],
        },{
            type: 'radio',
            label: 'Is your organization’s bank account already linked to this PayPal account?',
            description: 'If not, we\'ll send you instructions!',
        },
    ],
};

export {
    payPalFormFields,
};