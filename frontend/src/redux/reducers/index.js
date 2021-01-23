import { combineReducers } from 'redux';
import errors from './errors';
import instance from './instance';
import isLoading from './isLoading';

export default combineReducers({
    errors,
    instance,
    isLoading,
});