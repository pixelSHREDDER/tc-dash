const mailingAddressFormFields = [
    {
        type: 'text',
        id: 'address_line_1',
        label: 'Address (Line 1)',
        validators: ['required'],
    },
    {
        type: 'text',
        id: 'address_line_2',
        label: 'Address (Line 2)',
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
    /*{
        type: 'zip',
        id: 'zip',
        validators: ['required'],
    },*/
];

export {
    mailingAddressFormFields,
};