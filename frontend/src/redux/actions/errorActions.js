import { ADD_ERROR, REMOVE_ERROR } from './types';
import { DEBUG } from '../../conf';
  
export const addError = (data) => async (dispatch) => {
    DEBUG && console.error(data.response);
    dispatch({
        type: ADD_ERROR,
        payload: data.response.status
    });
};

export const removeError = (data) => async (dispatch) => {
    dispatch({
        type: REMOVE_ERROR,
        payload: data
    });
};