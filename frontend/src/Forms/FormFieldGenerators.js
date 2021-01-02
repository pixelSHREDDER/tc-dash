const getEmailPasswordFormFields = (prefix, labels = ['Email address', 'Password']) => {
    return (
        [{
            type: 'text',
            name: `${prefix}_email_address`,
            label: labels[0],
            validators: ['required', 'email'],
        },{
            type: 'password',
            name: `${prefix}_password`,
            label: labels[1],
            validators: ['required'],
        }]
    );
};

const getIsPublicFormFields = (prefix, type = 'account') => {
    return (
        [{
            type: 'radio',
            name: `${prefix}_public`,
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

const getMailingAddressFormFields = (
    prefix,
    names,
    labels = [
        'Address, line 1',
        'Address, line 2 (optional)',
        'Town/city',
        'Zip code',
    ]
) => {
    try {
        return (
            [{
                type: 'text',
                name: names[0],
                id: `${prefix}_${names[0]}`,
                label: labels[0],
                validators: ['required'],
            },
            {
                type: 'text',
                name: names[1],
                id: `${prefix}_${names[1]}`,
                label: labels[1],
            },
            {
                type: 'text',
                name: names[2],
                id: `${prefix}_${names[2]}`,
                label: labels[2],
                validators: ['required'],
            },
            {
                type: 'state',
                name: names[3],
                id: `${prefix}_${names[3]}`,
                validators: ['required'],
            },
            {
                type: 'zip',
                name: names[4],
                id: `${prefix}_${names[4]}`,
                label: labels[3],
                validators: ['required'],
            },]
        );
    } catch(e) {
        console.log(e);
        return [];
    }
};

const getTwoFactorFormFields = (prefix, labels = [
    'Name of person responsible for 2FA',
    'Email of person responsible for 2FA'
]) => {
    return (
        [{
            type: 'radioToggle',
            label: 'Do you have two-factor authentication (2FA) enabled?',
            fields: [
                {
                    type: 'text',
                    name: `${prefix}_2fa_name`,
                    label: labels[0],
                    validators: ['required'],
                },{
                    type: 'text',
                    name: `${prefix}_2fa_email_address`,
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
            name: `${prefix}_username`,
            label: labels[0],
            validators: ['required'],
        },{
            type: 'password',
            name: `${prefix}_password`,
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