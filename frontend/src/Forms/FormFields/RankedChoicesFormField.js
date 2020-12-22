import React from 'react';
import PropTypes from 'prop-types';
import FormValidators from './../FormValidators';
import TextFormField from './TextFormField';
import { withStyles } from '@material-ui/core/styles';
import {
    FormControl,
    FormHelperText,
    FormLabel,
} from '@material-ui/core';

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing(2),
    },
});

class RankedChoicesFormField extends React.Component {
    constructor() {
        super();
        this.state = {
            choiceErrors: {},
            rankedChoices: {},
        };
        this.renderChoices = this.renderChoices.bind(this);
    };

    validateProperty = (data, validators) => {
        let message = '';
        let isRequired = false;

        for (let v in validators) {
            if (validators[v] === 'required') { isRequired = true }
            if (validators[v] in FormValidators) {
                let error = FormValidators[validators[v]](data);
                if (error.length) { message.length ? message += `, and ${error.replace(/^\w/, c => c.toLowerCase())}` : message += error }
            }
        };

        return {
            errorMessage: message.length ? `${message} :(` : '',
            isRequired,
        };
    }

    handleInputChange = (value, id, name, validators, parents) => {
        console.log(value, id, name, validators, parents);
        const { inputChangeCallback } = this.props;
        const { choiceErrors, rankedChoices } = this.state;
        const currentChoice = parseInt(id.split('_').pop());
        const { errorMessage, isRequired } = this.validateProperty(value, validators);

        let newChoices = {...rankedChoices};
        let newChoiceErrors = {...choiceErrors};

        if (errorMessage) { newChoiceErrors[id] = errorMessage }
        else { delete newChoiceErrors[id] }

        //if (!newChoiceErrors.length) {
        if (!(id in newChoiceErrors)) {
            newChoices[currentChoice] = value;
            inputChangeCallback({ newChoices, id, name, validators, isRequired, parents });
            this.setState({
                choiceErrors: newChoiceErrors,
                rankedChoices: newChoices,
            });
        } else {
            this.setState({ choiceErrors: newChoiceErrors });
        }
    };

    renderChoices = field => {
        const { choiceCount, errors } = this.props;

        let choiceFields = [];
        let choices = [];
        let validators = field.validators || [];
        let allErrors = {...errors, ...this.state.choiceErrors};

        if (validators.indexOf('required') === -1) { validators = ['required', ...validators] }

        for (let i = 1; i <= choiceCount; i++) {
            let choiceField = {
                type: 'text',
                name: field.name,
                id: `${field.id}_${i}`,
                label: `#${i} choice`,
                validators: validators,
            };
            choiceFields.push(choiceField);

            choices.push(
                <React.Fragment key={`${field.id}_${i}`}>
                    <TextFormField
                        fields={choiceFields}
                        index={i - 1}
                        errors={allErrors}
                        inputChangeHandler={this.handleInputChange}
                    />
                </React.Fragment>
            )
        };

        return choices;
    }

    render() {
        const { classes, choiceCount, description, errors, fields, index, label } = this.props;
        const field = fields[index];

        return (
            <FormControl component="fieldset" className={classes.formControl} error={field.id in errors} fullWidth>
                <FormLabel component="legend">{label}</FormLabel>
                <FormHelperText>{description || `Please enter ${choiceCount} choices in order of preference.`}</FormHelperText>
                {this.renderChoices(field)}
            </FormControl>
        );
    }
}

RankedChoicesFormField.propTypes = {
    choiceCount: PropTypes.number.isRequired,
    description: PropTypes.string,
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(RankedChoicesFormField);