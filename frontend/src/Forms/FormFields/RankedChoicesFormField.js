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
        let errorMessage = '';

        for (let v in validators) {
            if (validators[v] in FormValidators) {
                let error = FormValidators[validators[v]](data);
                if (error.length) { errorMessage.length ? errorMessage += `, and ${error.replace(/^\w/, c => c.toLowerCase())}` : errorMessage += error }
            }
        };

        return errorMessage.length ? `${errorMessage} :(` : '';
    }

    handleInputChange = (value, field, validators) => {
        const { inputChangeCallback } = this.props;
        const { choiceErrors, rankedChoices } = this.state;
        const currentChoice = parseInt(field.split('_').pop());

        let newChoices = {...rankedChoices};
        let newChoiceErrors = {...choiceErrors};
        let errorMessage = '';

        errorMessage = this.validateProperty(value, validators);

        if (errorMessage) { newChoiceErrors[field] = errorMessage }
        else { delete newChoiceErrors[field] }

        newChoices[currentChoice] = value;
        this.setState({ choiceErrors: newChoiceErrors });

        if (!newChoiceErrors.length) {
            this.setState({ rankedChoices: newChoices });
            inputChangeCallback({ field, rankedChoices, fieldCount: 0 });
        }
    };

    renderChoices = (field) => {
        const { choiceCount, errors, form, label } = this.props;
        const { choiceErrors } = this.state;

        let choiceFields = [];
        let choices = [];
        let validators = field.validators || [];
        let allErrors = {...errors, ...choiceErrors};

        if (validators.indexOf('required') === -1) { validators = ['required', ...validators] }

        for (let i = 1; i <= choiceCount; i++) {
            let choiceField = {
                type: 'text',
                id: `${label.replace(/ /g, '_')}_${i}`,
                label: `#${i} choice`,
                validators: validators,
            };
            choiceFields.push(choiceField);

            choices.push(
                <React.Fragment key={i}>
                    <TextFormField
                        fields={choiceFields}
                        index={i - 1}
                        form={form}
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
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    choiceCount: PropTypes.number.isRequired,
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RankedChoicesFormField);