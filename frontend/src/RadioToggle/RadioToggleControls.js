import React from 'react';
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
        //margin: theme.spacing(1),
    },
}));

const RadioToggleControls = ({title, description, labels = ['Yes', 'No'], inputKey, sendRadio}) => {
    const classes = useStyles();
    //const [value, setValue] = React.useState();
    
    const {inputs, handleInputChange} = useForm({[inputKey]: null}, sendRadio);

    return (
        <form className={classes.container} noValidate>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{title}</FormLabel>
                <FormHelperText>{description}</FormHelperText>
                <RadioGroup
                    aria-label={title}
                    name={inputKey}
                    className={classes.group}
                    //value={value}
                    defaultValue={inputs.value}
                    onChange={handleInputChange}
                    //onChange={(event) => {event.persist(); console.log(event);}}
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

export default RadioToggleControls;