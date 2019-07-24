import React from 'react';
import PropTypes from 'prop-types';
import RadioToggleControls from './RadioToggleControls';
import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel/*,
    TextField*/
} from '@material-ui/core';

class RadioToggle extends React.Component {
    state = {
        formOpen: false,
        form: {
            text: '',
        },
        errors: {},
    };

    validate = () => {
        const { form } = this.state;
        const errors = {};

        if (form.text.trim() === '') errors.text = 'Field is required.';

        return Object.keys(errors).length === 0 ? null : errors;
    };

    validateProperty = ({name, value}) => {
        if (name === 'username') {
            if (value.trim() === '') return 'username required';
        }
    }

    handleRadioToggle = (inputKey, data) => {
        const { radioChangeCallback } = this.props;
        let inputVal = data[inputKey];
        inputVal = (inputVal === 'true') ? true : (inputVal === 'false') ? false : null;
        this.setState({ formOpen: inputVal });
        radioChangeCallback(inputVal);
    };


    handleFormChange = (inputKey, data) => {
        const { formChangeCallback } = this.props;
        const { errors, form } = this.state;
        const errors = { ...errors };
        let inputVal = data[inputKey];
        const errorMessage = this.validateProperty(inputVal);
        if (errorMessage) errors[inputKey] = errorMessage;
        else delete errors[input.name];
        let newForm = { ...form};
        newForm[inputKey] = inputVal;
        //inputVal = (inputVal === 'true') ? true : (inputVal === 'false') ? false : null;
        this.setState({
            form: newForm,
            errors
        });
        if (errors) return;
        formChangeCallback(inputVal);
    };

    render() {
        const { title, description, labels, formChangeCallback } = this.props;
        const { errors, form, formOpen } = this.state;
        const inputKey = title.replace(/ /g, '_');

        return (
            <React.Fragment>
                <RadioToggleControls title={title} description={description} labels={labels} inputKey={inputKey} sendRadio={(data) => this.handleRadioToggle(inputKey, data)} />
                {
                formOpen &&
                    <React.Fragment>
                        <br></br>
                        <fieldset>
                            {/*<TextField
                                id="standard-name"
                                label="Name"
                                //className={classes.textField}
                                value={form.text}
                                onChange={(data) => this.handleFormChange(inputKey, data)}
                                margin="normal"
                            />*/}
                            <FormControl error={errors}>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    id="name"
                                    value={form.text}
                                    onChange={(data) => this.handleFormChange(inputKey, data)}
                                    aria-describedby="name-helper-text"
                                />
                                <FormHelperText id="name-helper-text">
                                    {errors.map(error => (
                                        <React.Fragment>
                                            <span key={error.key}>{error}</span>
                                            <br />
                                        </React.Fragment>
                                    ))}
                                    Please enter a name.
                                </FormHelperText>
                            </FormControl>
                        </fieldset>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

RadioToggle.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    labels: PropTypes.array,
    formChangeCallback: PropTypes.func.isRequired,
};

export default RadioToggle;