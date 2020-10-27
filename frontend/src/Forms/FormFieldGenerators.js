const getEmailPasswordFormFields = (prefix, labels = ['Email address', 'Password']) => {
    return (
        [{
            type: 'text',
            id: `${prefix}_email_address`,
            label: labels[0],
            validators: ['required', 'email'],
        },{
            type: 'password',
            id: `${prefix}_password`,
            label: labels[1],
            validators: ['required'],
        }]
    );
};

const getIsPublicFormFields = (prefix, type = 'account') => {
    return (
        [{
            type: 'radio',
            id: `${prefix}_public`,
            label: `Is your ${type} public, or for internal use only?`,
            options: [
                {
                    label: 'Public',
                    value: 'true',
                },{
                    label: 'Internal Only',
                    value: 'false',
                }
            ],
            validators: ['required'],
        }]
    );
};

const getMailingAddressFormFields = (prefix, labels = [
    'Address, line 1',
    'Address, line 2 (optional)',
    'Town/city',
    'Zip code',
]) => {
    return (
        [{
            type: 'text',
            id: `${prefix}_address_line_1`,
            label: labels[0],
            validators: ['required'],
        },
        {
            type: 'text',
            id: `${prefix}_address_line_2`,
            label: labels[1],
        },
        {
            type: 'text',
            id: `${prefix}_city`,
            label: labels[2],
            validators: ['required'],
        },
        {
            type: 'state',
            id: `${prefix}_state`,
            validators: ['required'],
        },
        {
            type: 'zip',
            id: `${prefix}_zip`,
            label: labels[3],
            validators: ['required'],
        },]
    );
};

const getTwoFactorFormFields = (prefix, labels = [
    'Name of person responsible for 2FA',
    'Email of person responsible for 2FA'
]) => {
    return (
        [{
            type: 'radioToggle',
            id: `${prefix}_2fa`,
            label: 'Do you have two-factor authentication (2FA) enabled?',
            fields: [
                {
                    type: 'text',
                    id: `${prefix}_2fa_name`,
                    label: labels[0],
                    validators: ['required'],
                },{
                    type: 'text',
                    id: `${prefix}_2fa_email_address`,
                    label: labels[1],
                    validators: ['required', 'email'],
                },
            ],
        }]
    );
};

const getUsernamePasswordFormFields = (prefix, labels = ['Username', 'Password']) => {
    return (
        [{
            type: 'text',
            id: `${prefix}_username`,
            label: labels[0],
            validators: ['required'],
        },{
            type: 'password',
            id: `${prefix}_password`,
            label: labels[1],
            validators: ['required'],
        }]
    );
};

export {
    getEmailPasswordFormFields,
    getIsPublicFormFields,
    getMailingAddressFormFields,
    getTwoFactorFormFields,
    getUsernamePasswordFormFields,
};