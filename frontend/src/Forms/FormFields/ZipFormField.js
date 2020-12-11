import React from 'react';
import PropTypes from 'prop-types';
import InputMask from "react-input-mask";
import { withStyles } from '@material-ui/core/styles';
import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel/*,
    TextField*/
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
        currentValue: null,
    };

    //TODO: Replace with real data
    componentDidMount = () => this.setState({ currentValue: this.props.form.text });

    handleOnBlur = (value, id, name, validators) => {
        if (value === this.state.currentValue) return;
        this.props.inputChangeHandler(value, id, name, ['zip', ...validators]);
        this.setState({ currentValue: value });
    };

    render() {
        const { classes, errors, fields, index } = this.props;
        const field = fields[index];

        if (!('label' in field)) { field.label = 'Zip Code'; }
        if (!('id' in field)) { field.id = field.label.replace(/ /g, '_'); }
    
        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    {/* Couldn't get this to work: https://stackoverflow.com/questions/45758998/how-can-i-mask-my-material-ui-textfield */}
                    {/* https://github.com/sanniassin/react-input-mask */}
                    <InputMask
                            mask={[/^\d{5}(-\d{4})?$/]}
                            //maskPlaceholder="_____-____"
                            value={this.state.currentValue}
                            onBlur={e => this.handleOnBlur(e.target.value, field.id, field.name, field.validators)}
                            //onChange={e => this.handleInputChange(e.target.value, field.id, field.validators)}
                            //alwaysShowMask={true}
                    >
                        {/* {() => <TextField
                            id={field.id}
                            //defaultValue={form.text}
                            //value={currentValue}
                            //onBlur={e => this.handleFormChange(e.target.value, field.id, field.validators)}
                            *//*onBlur={e => this.handleInputChange(e.target.value, field.id, field.validators)}
                            onChange={e => this.handleInputChange(e.target.value, field.id, field.validators)}*//*
                            aria-describedby={`${field.id}-helper-text`}
                        />} */}
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
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(ZipFormField);