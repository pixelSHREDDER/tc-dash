import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
});
  

class SelectFormField extends React.Component {
    state = {
        selectedValue: '',
        showOther: false,
    };

    handleInputChange = (value, field, validators) => {
        const { inputChangeHandler } = this.props;

        this.setState({ selectedValue: value });
        if (value === 'other') { this.setState({ showOther: true }) }
        else { inputChangeHandler(value, field, validators) }
    };

    render() {
        const { fields, index, /*form,*/ errors, inputChangeHandler } = this.props;
        const { selectedValue, showOther } = this.state;
        const field = fields[index];

        if (!('label' in field)) { field.label = 'Please select an option'; }
        if (!('id' in field)) { field.id = field.label.replace(/ /g, '_'); }
    
        return (
            <Grid item sm={12}>
                <FormControl component="fieldset" error={field.id in errors} fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                        labelid={`${field.id}_label`}
                        id={field.id}
                        value={selectedValue}
                        //onBlur={e => this.handleInputChange(e.target.value, field.id, field.validators)}
                        onChange={e => this.handleInputChange(e.target.value, field.id, field.validators)}
                    >
                        {Object.entries(field.options).map(([key,value]) => (
                            <MenuItem key={key} value={key}>{value}</MenuItem>
                        ))}
                        {
                        field.other &&
                            <MenuItem value="other">Other:</MenuItem>
                        }
                    </Select>
                    {
                    showOther &&
                        <Input
                            id={`${field.id}_other`}
                            placeholder="(please specify)"
                            onBlur={e => inputChangeHandler(e.target.value, field.id, ['required', ...field.validators])}
                        />
                    }
                    <FormHelperText id={`${field.id}-helper-text`}>
                        {(field.id in errors) && <span>{errors[field.id]}</span>}
                    </FormHelperText>
                </FormControl>
            </Grid>
        );
    }
}

SelectFormField.propTypes = {
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    //form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SelectFormField);