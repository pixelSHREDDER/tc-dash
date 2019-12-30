import {
    getUsernamePasswordFormFields,
    getTwoFactorFormFields,
} from '../Forms/FormFieldGenerators';

const websiteFormFields = [
    {
        type: 'text',
        id: 'website_url',
        label: 'Website URL',
        validators: ['required', 'url'],
    },{
        type: 'select',
        id: 'website_hosting_provider',
        label: 'Hosting provider',
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
    },{
        type: 'fileUpload',
        id: 'website_up',
        label: 'Website URL',
        fileType: 'documents',
        filesLimit: 10,
        validators: ['required'],
    },{
        type: 'imageUpload',
        id: 'website_up2',
        label: 'Website Avatar',
        fileType: 'transparentImages',
        validators: ['required'],
    },
    ...getUsernamePasswordFormFields('website_hosting', ['Hosting username/email', 'Hosting password']),
    ...getTwoFactorFormFields('website_hosting'),
];

export {
    websiteFormFields,
};