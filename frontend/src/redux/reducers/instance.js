import { UPDATE_INSTANCE, UPDATE_ONBOARDING_PROGRESS } from '../actions/types';

const initialState = {
    //domain: '',
    onboarding_progress: {
        'organization_info': 0,
        'website': 0,
        'board': 0,
        'email': 0,
        'social_media': 0,
        'payments_finances': 0,
        'analytics_seo': 0,
        'podcasting': 0,
        'bylaws_constitution': 0,
        'branding_personalization': 0,
    },
};

const handleInstance = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INSTANCE:
            return {
                ...action.payload
            }
        case UPDATE_ONBOARDING_PROGRESS:
            return {
                ...state,
                onboarding_progress: action.payload,
            }
        default:
            return state;
    }
};

export default handleInstance;