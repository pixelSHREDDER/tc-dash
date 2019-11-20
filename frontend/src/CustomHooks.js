import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const useForm = (initialValues, inputChangeCallback, submitCallback, skipFirstEffect) => {
    const skipEffect = useRef(skipFirstEffect);
    const [inputs, setInputs] = useState(initialValues);

    useEffect(() => {
        if (inputChangeCallback && !skipEffect.current) {
            inputChangeCallback(inputs);
        } else skipEffect.current = false;
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

export { useForm };