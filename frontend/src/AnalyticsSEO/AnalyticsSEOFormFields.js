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

const googleSearchConsoleFormFields = {
    'existing': [
        ...getEmailPasswordFormFields('google_search_console'),
        ...getTwoFactorFormFields('google_search_console'),
    ],
};

export {
    googleAnalyticsFormFields,
    googleSearchConsoleFormFields,
};