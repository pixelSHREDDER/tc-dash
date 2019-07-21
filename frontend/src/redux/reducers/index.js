import { combineReducers } from 'redux';
import instance from './instance';
import { TOGGLE_ISLIVE, TOGGLE_LOADING } from '../actions/types';

export default combineReducers({
    instance,
    isLive: (state = false, action) => { return (action.type === TOGGLE_ISLIVE) ? action.payload : state; },
    loading: (state = true, action) => { return (action.type === TOGGLE_LOADING) ? action.payload : state; },
});