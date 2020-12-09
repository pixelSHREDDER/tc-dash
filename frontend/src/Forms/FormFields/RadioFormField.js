import React from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
} from '@material-ui/core';

class RadioFormField extends React.Component {
    state = {
        currentValue: null,
    };

    //TODO: Replace with real data
    componentDidMount = () => this.setState({ currentValue: this.props.form.text });

    handleOnChange = (value, id, validators) => {
        if (value === this.state.currentValue) return;
        this.props.inputChangeHandler(value, id, validators);
        this.setState({ currentValue: value });
    };

    render() {
        const { errors, fields, index } = this.props;
        const field = fields[index];

        if (!('label' in field)) { field.label = 'Pick one!'; }
        if (!('id' in field)) { field.id = field.label.replace(/ /g, '_'); }
        if (!field.options) {
            field.options = [
                {
                    label: 'Yes',
                    value: 'true',
                },{
                    label: 'No',
                    value: 'false',
                }
            ];
        }
    
        return (
            <Grid item sm={12}>
                <FormControl component="fieldset" error={field.id in errors} fullWidth>
                    <FormLabel component="legend">{field.label}</FormLabel>
                        {
                        field.description &&
                            <FormHelperText>{field.description}</FormHelperText>
                        }
                    <RadioGroup
                        aria-label={field.label}
                        name={field.id}
                        onChange={e => this.handleOnChange(e.target.value, field.id, field.validators)}
                        aria-describedby={`${field.id}-helper-text`}
                        row
                    >
                        {
                        field.options.map(option => (
                            <FormControlLabel key={`${field.id}_${option.value}`}
                                id={`${field.id}_${option.value}`}
                                value={option.value}
                                checked={this.state.currentValue === option.value}
                                control={<Radio color="primary" />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
        );
    }
}

RadioFormField.propTypes = {
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default RadioFormField;