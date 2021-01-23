import { ADD_ERROR, REMOVE_ERROR } from './types';
  
export const addError = (data) => async (dispatch) => {
    console.error(data);
    dispatch({
        type: ADD_ERROR,
        payload: data
    });
};

export const removeError = (data) => async (dispatch) => {
    dispatch({
        type: REMOVE_ERROR,
        payload: data
    });
};