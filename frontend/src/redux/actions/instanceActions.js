import {
  TOGGLE_ISLIVE,
  TOGGLE_LOADING,
  UPDATE_INSTANCE,
  UPDATE_ONBOARDING_PROGRESS,
} from './types';

export const setInstance = (data) => async (dispatch) => {
    dispatch({
        type: UPDATE_INSTANCE,
        payload: data
    });
    dispatch({
        type: TOGGLE_ISLIVE,
        payload: false
    });
    dispatch({
        type: TOGGLE_LOADING,
        payload: false
    });
}

export const updateInstance = (data) => async (dispatch) => {
  dispatch({
      type: UPDATE_INSTANCE,
      payload: data
  });
}

export const updateOnboardingProgress = (data) => async (dispatch) => {
  try {    
    dispatch({
        type: UPDATE_ONBOARDING_PROGRESS,
        payload: data
    });
  } catch (err) {
    console.log(err);
    //if (err.response.status===401 && err.config) {

    //}
  }
};
