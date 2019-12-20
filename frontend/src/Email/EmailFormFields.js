import {
    getEmailPasswordFormFields,
    getTwoFactorFormFields,
    getUsernamePasswordFormFields,
} from '../Forms/FormFieldGenerators';

const emailFormFields = {
    'existing': [
        ...getEmailPasswordFormFields('mailchimp', ['Email account address', 'Email account password']),
        {
            type: 'text',
            id: 'forwarding_position',
            label: 'Whom should we forward incoming mail to? (replace me with Board select)',
            validators: ['required'],
        },
    ],
};
const mailchimpFormFields = {
    'existing': [
        ...getUsernamePasswordFormFields('mailchimp'),
        ...getTwoFactorFormFields('mailchimp'),
    ],
};

export {
    emailFormFields,
    mailchimpFormFields,
};