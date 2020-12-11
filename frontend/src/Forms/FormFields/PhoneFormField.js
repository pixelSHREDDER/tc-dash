import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
    FormControl,
    FormHelperText,
    Grid
} from '@material-ui/core';

const styles = theme => ({
    grid: {
        flexGrow: 1,
    },
    fieldset: {
        margin: `${theme.spacing(3)}px 0`,
        padding: theme.spacing(2),
    },
    formHelperText: {
        marginBottom: theme.spacing(1),
    },
});

class PhoneFormField extends React.Component {
    state = {
        currentValue: null,
    };

    //TODO: Replace with real data
    componentDidMount = () => this.setState({ currentValue: this.props.form.text });

    handleOnBlur = (value, id, name, validators) => {
        if (value === this.state.currentValue) return;
        this.props.inputChangeHandler(value, id, name, ['phone', ...validators]);
        this.setState({ currentValue: value });
    };

    render() {
        const { classes, errors, fields, index } = this.props;
        const field = fields[index];

        if (!('label' in field)) { field.label = 'Please enter a phone number'; }
        if (!('id' in field)) { field.id = field.label.replace(/ /g, '_'); }
    
        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                {
                    field.label &&
                        <FormHelperText>{field.label}</FormHelperText>
                    }
                    <MuiPhoneNumber
                        defaultCountry={'us'}
                        onlyCountries={['us']}
                        id={field.id}
                        onBlur={e => this.handleOnBlur(e.target.value, field.id, field.name, field.validators)}
                        aria-describedby={`${field.id}-helper-text`}
                        disableCountryCode
                        disableDropdown
                    />
                    {
                    field.description &&
                        <FormHelperText>{field.description}</FormHelperText>
                    }
                    <FormHelperText id={`${field.id}-helper-text`} className={(index === (fields.length - 1)) ? classes.formHelperText : ''}>
                        {(field.id in errors) && <span>{errors[field.id]}</span>}
                    </FormHelperText>
                </FormControl>
            </Grid>
        );
    }
}

PhoneFormField.propTypes = {
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(PhoneFormField);