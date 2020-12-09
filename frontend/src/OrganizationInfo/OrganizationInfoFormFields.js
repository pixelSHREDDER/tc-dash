import {
    getMailingAddressFormFields,
} from '../Forms/FormFieldGenerators';

const organizationMailingAddressFormFields = [
    ...getMailingAddressFormFields(
        'organization',
        [
            'line_1',
            'line_2',
            'city',
            'state',
            'zip',
        ]
    ),
];

export {
    organizationMailingAddressFormFields,
};