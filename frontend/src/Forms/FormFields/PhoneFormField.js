import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiPhoneInput from 'material-ui-phone-number';
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
    handleInputChange = (value) => {
        const { fields, index, inputChangeHandler } = this.props;
        console.log(value);
        inputChangeHandler(value, fields[index].id, ['phone', ...fields[index].validators]);
    };

    render() {
        const { classes, fields, index, /*form,*/ errors } = this.props;
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
                    <MuiPhoneInput
                        onlyCountries={['us']}
                        id={field.id}
                        //defaultValue={form.text}
                        onChange={this.handleInputChange}
                        aria-describedby={`${field.id}-helper-text`}
                        countryCodeEditable="false"
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
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(PhoneFormField);