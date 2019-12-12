import { UPDATE_INSTANCE } from '../actions/types';

const initialState = {
    domain: '',
    onboarding_progress: {
        'organization_info': 0,
        'website': 100,
        'board': 60,
        'email': 25,
        'social_media': 10,
        'payments_finances': 0,
        'analytics_seo': 100,
        'podcasting': 40,
        'bylaws_constitution': 10,
        'branding_personalization': 80,
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_INSTANCE:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}