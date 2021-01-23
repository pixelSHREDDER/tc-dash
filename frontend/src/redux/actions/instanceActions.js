import {
  ADD_ERROR,
  SET_INSTANCE,
  UPDATE_INSTANCE,
  UPDATE_ONBOARDING_PROGRESS,
} from './types';

export const setInstance = (data) => async (dispatch) => {
  try {  
    dispatch({
      type: SET_INSTANCE,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: ADD_ERROR,
      payload: e
    });
    console.error(e);
    //if (err.response.status===401 && err.config) {

    //}
  }
}

export const updateInstance = (data) => async (dispatch) => {
  try {  
    dispatch({
      type: UPDATE_INSTANCE,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: ADD_ERROR,
      payload: e
    });
    console.error(e);
    //if (err.response.status===401 && err.config) {

    //}
  }
}

export const updateOnboardingProgress = (data) => async (dispatch) => {
  try {    
    dispatch({
      type: UPDATE_ONBOARDING_PROGRESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: ADD_ERROR,
      payload: e
    });
    console.error(e);
    //if (err.response.status===401 && err.config) {

    //}
  }
};
