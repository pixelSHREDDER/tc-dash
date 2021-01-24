import { useState, useEffect, useRef } from 'react';
import { useDispatch/*, useSelector*/ } from "react-redux";
import { addError } from "./redux/actions/errorActions";
import { setInstance } from "./redux/actions/instanceActions";
import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { AUTH0, URLS } from './conf';

const useInstance = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [currentInstance, setCurrentInstance] = useState(null);
  //const instance = useSelector(state => state.currentInstance);
  const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(setInstance());
    getInstanceCallback();
  }, [currentInstance]);*/

  const handleGetInstance = async (callback = () => {}) => {
    try {
      const token = await getAccessTokenSilently({
        audience: AUTH0.audience,
        scope: 'read:current_user',
      });
      //const response = await fetch(`http://${URLS.dataUrl}/instance/${user.sub}`, {
      const response = await axios.get(`http://${URLS.dataUrl}/instance/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data[0];
      setCurrentInstance(data);
      dispatch(setInstance(data));
      callback();
    } catch (e) {
      dispatch(addError(e));
    }
  };

  const handleSaveInstance = async (callback = () => {}) => {
    try {
      const token = await getAccessTokenSilently({
        audience: AUTH0.audience,
        scope: 'read:current_user',
      });
      await axios.put(`http://${URLS.dataUrl}/updateInstance/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: currentInstance
      });
      callback();
    } catch (e) {
      dispatch(addError(e));
    }
  };

  return {
    ...currentInstance,
    handleGetInstance,
    handleSaveInstance,
  };

  /*const { user, getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState({
      error: null,
      loading: true,
      data: null,
    });
    const [refreshIndex, setRefreshIndex] = useState(0);
  
    useEffect(() => {
      (async () => {
        try {
          const { audience, scope, ...fetchOptions } = options;
          const accessToken = await getAccessTokenSilently({ audience, scope });
          const res = await fetch(`${url}${user.sub}`, {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              // Add the Authorization header to the existing headers
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setState({
            ...state,
            data: await res.json(),
            error: null,
            loading: false,
          });
        } catch (error) {
          setState({
            ...state,
            error,
            loading: false,
          });
        }
      })();
    }, [refreshIndex]);
  
    return {
      ...state,
      refresh: () => setRefreshIndex(refreshIndex + 1),
    };*/
  };

const useForm = (initialValues, inputChangeCallback, submitCallback, skipFirstEffect) => {
    const skipEffect = useRef(skipFirstEffect);
    const [inputs, setInputs] = useState(initialValues);

    useEffect(() => {
        if (inputChangeCallback && !skipEffect.current) {
            inputChangeCallback(inputs);
        } else { skipEffect.current = false }
    }, [inputs, inputChangeCallback]);

    const handleSubmit = event => {
        if (event) event.preventDefault();
        if (submitCallback) submitCallback();
    };

    const handleInputChange = event => {
        event.persist();
        let inputKey = '';
        if (event.nativeEvent.target.id !== '') inputKey = event.nativeEvent.target.id;
        else if (event.nativeEvent.target.name !== '') inputKey = event.nativeEvent.target.name;
        setInputs(inputs => ({...inputs, [inputKey]: event.nativeEvent.target.value}));
        inputChangeCallback(inputs);
    };

    return {
        handleInputChange,
        handleSubmit,
        inputs
    };
}

useForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    inputChangeCallback: PropTypes.func,
    submitCallback: PropTypes.func,
    skipFirstEffect: PropTypes.bool
};

export {
    useForm,
    useInstance,
};