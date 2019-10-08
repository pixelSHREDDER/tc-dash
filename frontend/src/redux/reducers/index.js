import { combineReducers } from 'redux';
import error from './error';
import instance from './instance';
import { TOGGLE_ISLIVE, TOGGLE_LOADING } from '../actions/types';

export default combineReducers({
    error,
    instance,
    isLive: (state = false, action) => { return (action.type === TOGGLE_ISLIVE) ? action.payload : state; },
    loading: (state = true, action) => { return (action.type === TOGGLE_LOADING) ? action.payload : state; },
});