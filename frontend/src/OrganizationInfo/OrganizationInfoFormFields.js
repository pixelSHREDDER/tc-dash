import {
    getMailingAddressFormFields,
} from '../Forms/FormFieldGenerators';

const organizationMailingAddressFormFields = [
    ...getMailingAddressFormFields('organization'),
];

export {
    organizationMailingAddressFormFields,
};