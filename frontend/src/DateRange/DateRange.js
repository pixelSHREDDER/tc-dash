import React from 'react';
import { useForm } from '../CustomHooks';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const DateRange = ({sendDateRange}) => {
    const classes = useStyles();
    const {inputs, handleInputChange} = useForm({ from: '', to: '' }, sendDateRange, null, true);

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="from"
                label="From (optional)"
                type="date"
                className={classes.textField}
                onChange={handleInputChange}
                defaultValue={inputs.from}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="to"
                label="To (optional)"
                type="date"
                className={classes.textField}
                onChange={handleInputChange}
                defaultValue={inputs.to}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}

export default DateRange;