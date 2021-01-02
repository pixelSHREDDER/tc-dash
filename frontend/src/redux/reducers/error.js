import { ADD_ERROR } from '../actions/types';

const initialState = {};

const handleError = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}

export default handleError;