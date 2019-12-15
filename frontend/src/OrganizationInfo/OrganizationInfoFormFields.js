const mailingAddressFormFields = [
    {
        type: 'text',
        id: 'address_line_1',
        label: 'Address, line 1',
        validators: ['required'],
    },
    {
        type: 'text',
        id: 'address_line_2',
        label: 'Address, line 2 (optional)',
    },
    {
        type: 'text',
        id: 'city',
        label: 'Town/City',
        validators: ['required'],
    },
    {
        type: 'state',
        id: 'state',
        validators: ['required'],
    },
    {
        type: 'zip',
        id: 'zip',
        label: 'Zip code',
        validators: ['required'],
    },
];

export {
    mailingAddressFormFields,
};