import React from 'react';
import PropTypes from 'prop-types';
//import { useForm } from '../CustomHooks';
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
        //margin: `${theme.spacing(3)}px 0`,
        marginTop: theme.spacing(2),
    },
    /*group: {
        margin: [theme.spacing(1), 0],
    },*/
}));

const RadioToggleControls = ({label, description, optionLabels = ['Yes', 'No'], inputKey, sendRadio}) => {
    const classes = useStyles();    
    //const {inputs, handleInputChange} = useForm({[inputKey]: null}, sendRadio, null, true);

    return (
        <form className={classes.container} noValidate>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{label}</FormLabel>
                {
                    description &&
                    <FormHelperText>{description}</FormHelperText>
                }
                <RadioGroup
                    aria-label={label}
                    name={inputKey}
                    className={classes.group}
                    //defaultValue={inputs.value} 
                    onChange={e => sendRadio(e.target.value)}
                    row
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label={optionLabels[0]}
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio color="primary" />}
                        label={optionLabels[1]}
                    />
                </RadioGroup>
            </FormControl>
        </form>
    );
}

RadioToggleControls.propTypes = {
    description: PropTypes.string,
    inputKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    optionLabels: PropTypes.array,
    sendRadio: PropTypes.func.isRequired,
};

export default RadioToggleControls;