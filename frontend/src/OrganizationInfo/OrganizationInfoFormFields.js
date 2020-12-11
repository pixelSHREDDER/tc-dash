import {
    getMailingAddressFormFields,
} from '../Forms/FormFieldGenerators';

const organizationMailingAddressFormFields = [
    ...getMailingAddressFormFields(
        'organization',
        [
            'mailing_address_line_1',
            'mailing_address_line_2',
            'mailing_address_city',
            'mailing_address_state',
            'mailing_address_zip',
        ]
    ),
];

export {
    organizationMailingAddressFormFields,
};