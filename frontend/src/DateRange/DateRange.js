import React from 'react';
//import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
});

class DateRange extends React.Component {
    state = {
      from: '',
      to: '',
    };

    handleChange = () => (event) => {
        (event.target.id === 'from') ? this.setState({from: event.target.value}) : this.setState({to: event.target.value});
        this.props.sendDateRange(this.state);
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate>
                <TextField
                    id="from"
                    label="From (optional)"
                    type="date"
                    className={classes.textField}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="to"
                    label="To (optional)"
                    type="date"
                    className={classes.textField}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    }
}

export default withStyles(styles)(DateRange);