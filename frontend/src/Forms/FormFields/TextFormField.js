import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
} from '@material-ui/core';

const styles = theme => ({
    grid: {
        flexGrow: 1,
    },
    formHelperText: {
        marginBottom: theme.spacing(1),
    },
});

class TextFormField extends React.Component {
    render() {
        const { classes, fields, index, form, errors, inputChangeHandler } = this.props;
        const field = fields[index];
    
        if (!('label' in field)) { field.label = 'Fill me!'; }
        if (!('id' in field)) { field.id = field.label.replace(/ /g, '_'); }

        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    <Input
                        id={field.id}
                        defaultValue={form.text}
                        //onBlur={e => this.handleFormChange(e.target.value, field.id, field.validators)}
                        onBlur={e => inputChangeHandler(e.target.value, field.id, field.validators)}
                        aria-describedby={`${field.id}-helper-text`}
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

TextFormField.propTypes = {
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextFormField);