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
        type: 'text',
        id: 'website_hosting_username',
        label: 'Hosting username/email',
        validators: ['required'],
    },{
        type: 'password',
        id: 'website_hosting_password',
        label: 'Hosting password',
        validators: ['required'],
    }
];

export {
    websiteFormFields,
};