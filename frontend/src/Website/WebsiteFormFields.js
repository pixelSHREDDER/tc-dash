import {
    getUsernamePasswordFormFields,
    getTwoFactorFormFields,
} from '../Forms/FormFieldGenerators';

const oldWebsiteFormFields = [
    {
        type: 'text',
        name: 'url',
        label: 'Website URL',
        description: 'The website\'s homepage.',
        validators: ['required', 'url'],
    },
    ...getUsernamePasswordFormFields('admin', ['Website admin username/email', 'Website admin password']),
    ...getTwoFactorFormFields('admin'),
    {
        type: 'select',
        name: 'hosting_provider',
        label: 'Hosting provider',
        description: 'Who do you pay to host this website?',
        options: {
            'inmotion': 'InMotion',
            '1&1_ionos': '1&1 IONOS',
            'hostgator': 'HostGator',
            'godaddy': 'GoDaddy',
            'bluehost': 'Bluehost',
            'siteground': 'Siteground',
            'wix': 'Wix Web Hosting',
            'weebly': 'Weebly Web Hosting',
          },
          other: true,
          validators: ['required'],
    },
    ...getUsernamePasswordFormFields('hosting', ['Hosting username/email', 'Hosting password']),
    ...getTwoFactorFormFields('hosting'),
];

export {
    oldWebsiteFormFields,
};