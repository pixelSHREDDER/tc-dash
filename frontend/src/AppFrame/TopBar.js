import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { pageTitles } from '../Routes/Routes';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    IconButton,
    LinearProgress,
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
    progressBar: {
        position: 'absolute',
        right: theme.spacing(3),
        width: '20%',
    },
}));

const TopBar = ({pathname, handleDrawerToggle}) => {
    const isLive = useSelector(state => state.instance.isLive || false);
    const onboardingProgress = useSelector(state => state.instance.onboardingProgress || {});
    const classes = useStyles();
    const onboardingSection = pathname.replace('/get-started/', '').replace('-', '_');

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
                {
                (!isLive && onboardingSection in onboardingProgress) &&
                    <LinearProgress className={classes.progressBar} color="secondary" variant="determinate" value={onboardingProgress[onboardingSection]} />
                }
            </Toolbar>
        </AppBar>
    );
};

TopBar.propTypes = {
    pathname: PropTypes.string.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
};

export default TopBar;