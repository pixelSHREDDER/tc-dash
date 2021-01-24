import { ADD_ERROR, REMOVE_ERROR } from '../actions/types';

const initialState = [];
const errors = {
    4: {
        action: 'Summon Mike',
        action2: 'Meh, Never Mind',
        message: 'Yikes! Something went wrong. Get Mike!',
    },
    5: {
        action: 'Reload',
        action2: 'Get Help',
        message: 'Sorry, something went wrong on our end. Could you reload and try again?',
    },
    401: {
        action: 'Sign In',
        action2: 'It Won\'t Let Me!',
        message: 'Sorry, you need to sign in to do that.',
    },
    403: {
        action: 'Okay',
        action2: 'I Should Though!',
        message: 'Sorry, you don\'t have permission to do that.',
    },
    404: {
        action: 'Okay',
        action2: 'It Should Be There!',
        message: 'Sorry, we can\'t find what you\'re looking for.',
    },
    408: {
        action: 'Reload',
        action2: 'My Network\'s Fine Though!',
        message: 'It took too long to load what you asked for. Please reload and try again.',
    },
};

const handleError = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ERROR:
            if (action.payload in errors) { return [ ...state, {
                ...errors[action.payload],
                code: action.payload,
            }]}
            else {
                return [ ...state, {
                    ...errors[parseInt(toString(action.payload).substring(0, 1))],
                    code: action.payload,
                }]
            }
        case REMOVE_ERROR:
            return state.slice(0, action.payload);
        default:
            return state;
    }
}

export default handleError;