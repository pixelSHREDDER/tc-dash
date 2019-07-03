import { useState } from 'react';

//const useForm = ({initialValues, inputChangeCallback, submitCallback} = {}) => {
const useForm = (initialValues, inputChangeCallback, submitCallback) => {
  const [inputs, setInputs] = useState(initialValues);
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (submitCallback) submitCallback();
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    //if ('inputChangeCallback' in args[0]) args[0].inputChangeCallback();
    console.log(inputs);
    inputChangeCallback();
  }
  return {
    inputs,
    handleInputChange,
    handleSubmit
  };
}
export default useForm;