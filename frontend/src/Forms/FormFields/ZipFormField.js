import React from 'react';
import PropTypes from 'prop-types';
import InputMask from "react-input-mask";
import { withStyles } from '@material-ui/core/styles';
import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    TextField
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

class ZipFormField extends React.Component {
    state = {
        selectedValue: undefined,
    };

    handleInputChange = (value, field, validators) => {
        const { inputChangeHandler } = this.props;
        this.setState({ selectedValue: value });
        inputChangeHandler(value, field, ['zip', ...validators]);
    };

    render() {
        const { classes, fields, index, /*form,*/ errors } = this.props;
        const { selectedValue } = this.state;
        const field = fields[index];
    
        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    <InputMask
                            mask="/^\d{5}(-\d{4})?$/"
                            maskPlaceholder="-"
                            value={selectedValue}
                            onBlur={e => this.handleInputChange(e.target.value, field.id, field.validators)}
                            onChange={e => this.handleInputChange(e.target.value, field.id, field.validators)}
                            alwaysShowMask={true}
                    >
                        {() => <TextField
                            id={field.id}
                            //defaultValue={form.text}
                            //value={selectedValue}
                            //onBlur={e => this.handleFormChange(e.target.value, field.id, field.validators)}
                            /*onBlur={e => this.handleInputChange(e.target.value, field.id, field.validators)}
                            onChange={e => this.handleInputChange(e.target.value, field.id, field.validators)}*/
                            aria-describedby={`${field.id}-helper-text`}
                        />}
                    </InputMask>
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

ZipFormField.propTypes = {
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    //form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(ZipFormField);