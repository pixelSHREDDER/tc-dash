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
        options: [],
    };

    //TODO: Replace with real data
    componentDidMount = () => {
        const { fields, index } = this.props;
        
        this.setState({
            currentValue: fields[index].value,
            options: fields[index].options || [
                {
                    label: 'Yes',
                    value: 'true',
                },{
                    label: 'No',
                    value: 'false',
                }
            ],
        });
    }

    handleOnChange = (value, id, name, validators, parents) => {
        if (value === this.state.currentValue) return;
        this.props.inputChangeHandler(value, id, name, validators, parents);
        this.setState({ currentValue: value });
    };

    render() {
        const { errors, fields, index } = this.props;
        const field = fields[index];
    
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
                        onChange={e => this.handleOnChange(e.target.value, field.id, field.name, field.validators, field.parents)}
                        aria-describedby={`${field.id}-helper-text`}
                        row
                    >
                        {
                        this.state.options.map(option => (
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
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default RadioFormField;