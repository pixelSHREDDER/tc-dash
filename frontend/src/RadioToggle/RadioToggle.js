import React from 'react';
import PropTypes from 'prop-types';
import FormValidators from '../Forms/FormValidators';
import RadioToggleControls from './RadioToggleControls';
import { withStyles } from '@material-ui/core/styles';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Input,
    InputLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: [theme.spacing(1), 0],
    },
});

class RadioToggle extends React.Component {
    state = {
        formOpen: false,
        form: {
            text: '',
        },
        errors: {},
    };

    validateProperty = (data, validators) => {
        let errorMessage = '';

        for (let v in validators) {
            if (validators[v] in FormValidators) {
                let error = FormValidators[validators[v]](data);
                if (error.length) errorMessage.length ? errorMessage += `, and ${error.replace(/^\w/, c => c.toLowerCase())}` : errorMessage += error;
            }
        };

        return errorMessage.length ? `${errorMessage} :(` : '';
    }

    handleRadioToggle = (inputKey, data) => {
        const { radioChangeCallback } = this.props;
        let inputVal = data[inputKey];
        inputVal = (inputVal === 'true') ? true : (inputVal === 'false') ? false : null;
        this.setState({ formOpen: inputVal });
        radioChangeCallback(inputVal);
    };


    handleFormChange = (data, field, validators) => {
        const { formChangeCallback } = this.props;
        const { errors } = this.state;
        const formErrors = {...errors};
        const errorMessage = this.validateProperty(data, validators);

        if (errorMessage) formErrors[field] = errorMessage;
        else delete formErrors[field];
        this.setState({ errors: formErrors });
        if (!formErrors) formChangeCallback(data);
    };

    render() {
        const { classes, title, description, labels, fields } = this.props;
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
                            {fields.map(field => (
                                <React.Fragment key={field.id}>
                                {
                                (field.type === 'text') &&
                                    <FormControl error={field.id in errors}>
                                        <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                                        <Input
                                            id={field.id}
                                            defaultValue={form.text}
                                            onBlur={e => this.handleFormChange(e.target.value, field.id, field.validators)}
                                            aria-describedby={`${field.id}-helper-text`}
                                        />
                                        <FormHelperText id={`${field.id}-helper-text`}>
                                            {(field.id in errors) && <span>{errors[field.id]}</span>}
                                        </FormHelperText>
                                    </FormControl>
                                }
                                {
                                (field.type === 'radio') &&
                                    <FormControl component="fieldset" error={field.id in errors} className={classes.formControl}>
                                        <FormLabel component="legend">{field.label}</FormLabel>
                                        {
                                            field.description &&
                                            <FormHelperText>{field.description}</FormHelperText>
                                        }
                                        <RadioGroup
                                            aria-label={field.label}
                                            name={field.id}
                                            className={classes.group}
                                            onChange={e => this.handleFormChange(e.target.value, field.id, field.validators)}
                                            aria-describedby={`${field.id}-helper-text`}
                                            row
                                        >
                                            {field.options.map(option => (
                                                <FormControlLabel key={`${field.id}_${option.value}`}
                                                    id={`${field.id}_${option.value}`}
                                                    value={option.value}
                                                    control={<Radio color="primary" />}
                                                    label={option.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                }
                                </React.Fragment>
                            ))}
                        </fieldset>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

RadioToggle.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    labels: PropTypes.array,
    formChangeCallback: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(RadioToggle);