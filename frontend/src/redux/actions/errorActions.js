import { TOGGLE_LOADING } from './types';
  
export const addError = (data) => async (dispatch) => {
    console.error(data);
    dispatch({
        type: TOGGLE_LOADING,
        payload: false
    });
};