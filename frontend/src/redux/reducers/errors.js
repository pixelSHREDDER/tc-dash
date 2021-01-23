import { ADD_ERROR, REMOVE_ERROR } from '../actions/types';

const initialState = {};

const handleError = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ERROR:
            let newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

export default handleError;