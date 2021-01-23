import { SET_ISLOADING } from '../actions/types';
const setIsLoading = (state = true, action) => { return (action.type === SET_ISLOADING) ? action.payload : state };
export default setIsLoading;