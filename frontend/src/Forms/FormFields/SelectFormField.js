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
        currentValue: '',
        showOther: false,
    };

    //TODO: Replace with real data
    //componentDidMount = () => this.setState({ currentValue: this.props.fields[this.props.index].value });

    handleInput = (value, id, name, validators, parents) => {
        if (value === 'other') { this.setState({ showOther: true }) }
        else { this.props.inputChangeHandler(value, id, name, ['required', ...validators], parents) }
        this.setState({ currentValue: value });
    };

    render() {
        const { errors, fields, index } = this.props;
        const { currentValue, showOther } = this.state;
        const field = fields[index];
    
        return (
            <Grid item sm={12}>
                <FormControl component="fieldset" error={field.id in errors} fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                        labelid={`${field.id}_label`}
                        id={field.id}
                        value={currentValue}
                        onChange={e => this.handleInput(e.target.value, field.id, field.name, field.validators, field.parents)}
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
                            onBlur={e => this.handleInput(e.target.value, field.id, ['required', ...field.validators], field.parents)}
                        />
                    }
                    {
                    field.description &&
                        <FormHelperText>{field.description}</FormHelperText>
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
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SelectFormField);