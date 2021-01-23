import { SET_ISLOADING } from './types';

export const setIsLoading = (data) => async (dispatch) => {
    dispatch({
        type: SET_ISLOADING,
        payload: data
    });
}
