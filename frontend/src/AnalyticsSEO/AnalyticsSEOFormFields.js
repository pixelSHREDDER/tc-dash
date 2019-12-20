import {
    getEmailPasswordFormFields,
    getTwoFactorFormFields,
} from '../Forms/FormFieldGenerators';

const googleAnalyticsFormFields = {
    'existing': [
        ...getEmailPasswordFormFields('google_analytics'),
        ...getTwoFactorFormFields('google_analytics'),
    ],
};

export {
    googleAnalyticsFormFields,
};