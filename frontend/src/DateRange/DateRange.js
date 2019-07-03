//import React, { useState, useEffect } from 'react';
import React from 'react';
import useForm from '../CustomHooks';
//import React, { FC, ChangeEvent, FormEvent, useState } from "react";
//import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

//const styles = theme => ({
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
//});
}));

//class DateRange extends React.Component {
export default function DateRange({sendDateRange}) {
    const classes = useStyles();
    /*constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
        };
    }*/
    //const [from, setFrom] = useState('');
    //const [to, setTo] = useState('');
    const {inputs, handleInputChange} = useForm({ from: '', to: '' }, sendDateRange);
    /*useEffect(() => {
        sendDateRange({from, to});
    });*/

    //handleChange = () => (event) => {
    /*handleChange((event) => {
        console.log(event.target);
        if (event.target.id === 'from') this.setState({from: event.target.value});
        else this.setState({to: event.target.value});
        //this.props.sendDateRange(this.state);
    });*/
    //};

    //render() {
        //const { classes, sendDateRange } = this.props;

        return (
            <form className={classes.container} noValidate>
                <TextField
                    id="from"
                    label="From (optional)"
                    type="date"
                    className={classes.textField}
                    //onChange={this.handleChange(sendDateRange)}
                    //onChange={(event) => setFrom(event.target.value)}
                    onChange={handleInputChange}
                    value={inputs.from}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="to"
                    label="To (optional)"
                    type="date"
                    className={classes.textField}
                    //onChange={this.handleChange(sendDateRange)}
                    //onChange={(event) => setTo(event.target.value)}
                    onChange={handleInputChange}
                    value={inputs.to}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    //}
}

//export default withStyles(styles)(DateRange);