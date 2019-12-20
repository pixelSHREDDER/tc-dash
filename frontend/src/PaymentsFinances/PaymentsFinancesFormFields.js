import {
    getEmailPasswordFormFields,
    getTwoFactorFormFields,
} from '../Forms/FormFieldGenerators';

const payPalFormFields = {
    'existing': [
        ...getEmailPasswordFormFields('paypal'),
        ...getTwoFactorFormFields('paypal'),
        {
            type: 'radio',
            label: 'Is your organization’s bank account already linked to this PayPal account?',
            description: 'If not, we\'ll send you instructions!',
        },
    ],
};

export {
    payPalFormFields,
};