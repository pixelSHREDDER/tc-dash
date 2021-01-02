import {
    getEmailPasswordFormFields,
    getTwoFactorFormFields,
    getUsernamePasswordFormFields,
} from '../Forms/FormFieldGenerators';

const emailFormFields = {
    'existing': [
        ...getEmailPasswordFormFields('old_email', ['Email account address', 'Email account password']),
        {
            type: 'text',
            name: 'old_email_forwarding_position',
            label: 'Whom should we forward incoming mail to? (replace me with Board select)',
            validators: ['required'],
        },
        ...getTwoFactorFormFields('old_email'),
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