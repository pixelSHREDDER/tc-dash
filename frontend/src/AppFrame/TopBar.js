import React from 'react';
import PropTypes from 'prop-types';
import { pageTitles } from '../Routes/Routes';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core';
import { MenuIcon } from '../Icons';

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

const TopBar = ({pathname, handleDrawerToggle}) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerToggle}
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
};

TopBar.propTypes = {
    pathname: PropTypes.string.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
};

export default TopBar;