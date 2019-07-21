import { GET_INSTANCE, UPDATE_INSTANCE } from '../actions/types';

const initialState = {
    domain: '',
    onboarding_progress: {
        'organizationInfo': 2,
        'website': 2,
        'boardHierarchy': 2,
        'email': 2,
        'socialMedia': 2,
        'paymentsFinances': 2,
        'analyticsSeo': 2,
        'podcasting': 2,
        'bylawsConstitution': 2,
        'brandingPersonalization': 2,
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_INSTANCE:
        case UPDATE_INSTANCE:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}