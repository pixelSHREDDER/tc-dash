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
    state = {
        currentValue: null,
    }

    //TODO: Replace with real data 
    componentDidMount = () => this.setState({ currentValue: this.props.fields[this.props.index].value });

    handleOnBlur = (value, id, name, validators, parents) => {
        if (value === this.state.currentValue) return;
        this.props.inputChangeHandler(value, id, name, validators, parents);
        this.setState({ currentValue: value });
    }

    render() {
        const { classes, errors, fields, index } = this.props;
        const field = fields[index];

        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    <Input
                        id={field.id}
                        name={field.name}
                        defaultValue={field.value}
                        onBlur={e => this.handleOnBlur(e.target.value, field.id, field.name, field.validators, field.parents)}
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
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextFormField);