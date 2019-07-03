import React from 'react';
import { pageTitles } from '../Routes/Routes';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export default function TopBar({pathname}) {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    // TODO: Wire this to work with Nav component
                    //onClick={this.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                    {pageTitles[pathname]}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}