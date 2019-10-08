import { ADD_ERROR } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_ERROR:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}