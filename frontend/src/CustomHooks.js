import { useState } from 'react';

const useForm = ({initialValues, inputChangeCallback, submitCallback} = {}) => {
  const [inputs, setInputs] = useState(initialValues);
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (submitCallback) submitCallback();
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    //if ('inputChangeCallback' in args[0]) args[0].inputChangeCallback();
    console.log(inputChangeCallback);
    inputChangeCallback();
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}
export default useForm;