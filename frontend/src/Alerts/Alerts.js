import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { removeError } from '../redux/actions/errorActions';
import { SUPPORT } from '../conf';
import {
    Box,
    Button,
    Collapse,
    Grid,
    Paper,
    Typography,
} from '@material-ui/core';

function Alerts(props) {
    const { location } = props;
    const { loginWithRedirect, user } = useAuth0();
    const errors = useSelector(state => state.errors);
    const title = useSelector(state => state.instance.title);
    const [open, setOpen] = React.useState(!!errors.length);
    const dispatch = useDispatch();

    const clearAlert = (code, isAction2) => {
        setOpen(false);
        dispatch(removeError(0));
        if (isAction2) {
            switch (code) {
                case 401:
                case 403:
                case 404:
                case 408:
                    window.location.href = `mailto:${SUPPORT.email}?subject=[${user.name || 'N/A'}][${title || 'N/A'}][${location.pathname}][${code}]`;
                    break;
                default: return;
            }
        } else {
            switch (code) {
                case 401:
                    loginWithRedirect();
                    break;
                default:
                    window.location.reload();
                    break;
            }
        }
    }

    useEffect(() => { setOpen(!!errors.length) }, [errors]);

    return (
        <Collapse in={open}>
            { !!errors.length &&
                <Box clone pt={2} pr={1} pb={1} pl={2} borderRadius={0} elevation={0}>
                    <Paper>
                        <Grid container spacing={2} alignItems="center" wrap="nowrap">
                            <Grid item>
                                <Typography>{errors[0].message}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end" spacing={1}>
                            {errors[0].action2 &&
                                <Grid item>
                                    <Button color="primary" onClick={() => { clearAlert(errors[0].code, true) }}>{errors[0].action2}</Button>
                                </Grid>
                            }
                            <Grid item>
                                <Button color="primary" onClick={() => { clearAlert(errors[0].code) }}>{errors[0].action}</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            }
        </Collapse>
    );
}

export default withRouter(Alerts);