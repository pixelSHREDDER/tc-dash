import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    FormControl,
    FormHelperText,
    Grid,
    TextField,
} from '@material-ui/core';

const styles = theme => ({
    grid: {
        flexGrow: 1,
    },
    formHelperText: {
        marginBottom: theme.spacing(1),
    },
});

class TextareaFormField extends React.Component {
    state = {
        currentValue: null,
    };

    //TODO: Replace with real data
    componentDidMount = () => this.setState({ currentValue: this.props.form.text });

    handleOnBlur = (value, id, validators) => {
        if (value === this.state.currentValue) return;
        this.props.inputChangeHandler(value, id, validators);
        this.setState({ currentValue: value });
    };

    render() {
        const { classes, errors, fields, index } = this.props;
        const field = fields[index];
    
        if (!('label' in field)) { field.label = 'Fill me!'; }
        if (!('id' in field)) { field.id = field.label.replace(/ /g, '_'); }
        if (!('rows' in field)) { field.rows = 4; }

        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                    <TextField
                        multiline
                        id={field.id}
                        label={field.label}
                        defaultValue={this.state.currentValue}
                        rows={field.rows}
                        onBlur={e => this.handleOnBlur(e.target.value, field.id, field.validators)}
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

TextareaFormField.propTypes = {
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextareaFormField);