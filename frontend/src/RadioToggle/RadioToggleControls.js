import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from '../CustomHooks';
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup
  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: [theme.spacing(1), 0],
    },
}));

const RadioToggleControls = ({title, description, labels = ['Yes', 'No'], inputKey, sendRadio}) => {
    const classes = useStyles();    
    const {inputs, handleInputChange} = useForm({[inputKey]: null}, sendRadio);

    return (
        <form className={classes.container} noValidate>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{title}</FormLabel>
                {
                    description &&
                    <FormHelperText>{description}</FormHelperText>
                }
                <RadioGroup
                    aria-label={title}
                    name={inputKey}
                    className={classes.group}
                    defaultValue={inputs.value}
                    onChange={handleInputChange}
                    row
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label={labels[0]}
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio color="primary" />}
                        label={labels[1]}
                    />
                </RadioGroup>
            </FormControl>
        </form>
    );
}

RadioToggleControls.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    labels: PropTypes.array,
    inputKey: PropTypes.string.isRequired,
    sendRadio: PropTypes.func.isRequired,
};

export default RadioToggleControls;