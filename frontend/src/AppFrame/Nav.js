import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLive } from '../Instance/Instance';
import auth0Client from '../Auth';
import { routes } from '../Routes/Routes';
import ReviewModal from '../ReviewModal/ReviewModal';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import {
    Avatar,
    Divider,
    Drawer,
    Hidden,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    Slide
} from '@material-ui/core';
import { DoneIcon } from '../Icons';
//import { AccountCircle } from '@material-ui/icons';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
    },
    avatar: {
        width: 28,
        height: 28,
    },
    drawerList: {
        backgroundColor: theme.palette.background.paper,
    },
    drawerListUl: {
        padding: 0,
    },
    listSubheader: {
        backgroundColor: deepPurple[500],
        //backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    drawerListItemText: {
        padding: 0,
        paddingLeft: theme.spacing(0.5),
    },
    drawerListItemTitleLine1: {
        display: 'block',
    },
    smallIcon: {
        //float: 'right',
        fontSize: '0.75rem',
        marginLeft: theme.spacing(0.5),
    },
    progressBar: {
        marginTop: theme.spacing(0.5),
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
});

class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
          anchorEl: null,
        };
        this.renderDrawer = this.renderDrawer.bind(this);
    };

    handleMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    renderDrawer = () => {
        const { classes, handleLogOut, onboardingProgress } = this.props;
        const { anchorEl } = this.state;
        const { pathname } = this.props.location;
        const open = Boolean(anchorEl);
        let header;
        let drawerList;

        if (!auth0Client.isAuthenticated()) {
            header = (
                <div className={classes.toolbar}>
                    {/*<Button onClick={auth0Client.signIn}>Login</Button>*/}
                </div>
            );
            return (
                <React.Fragment>
                    {header}
                    <Divider />
                </React.Fragment>
            );
        } else if (auth0Client.isAuthenticated()) {
            header = (
                <div className={classes.toolbar}>
                    <React.Fragment>
                        <List className={classes.root}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt={auth0Client.getProfile().nickname}
                                        src={auth0Client.getProfile().picture}
                                        className={classes.avatar}
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleMenuOpen}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={"Hi, " + auth0Client.getProfile().nickname + "!"}/>
                                {/*<AccountCircle button
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenuOpen}
                                    color="inherit"
                                />
                                <ListItemText primary={"Hi, " + auth0Client.getProfile().nickname + "!"}/>*/}
                            </ListItem>
                            <Menu id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleMenuClose}
                            >
                                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                            </Menu>
                        </List>
                        {/*<IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenuOpen}
                        color="inherit"
                        >*/}
                            {/*<AccountCircle />*/}
                        {/*</IconButton>*/}
                    </React.Fragment>
                </div>
            );

            if (isLive) {
                drawerList = (
                    <List component="nav" className={classes.drawerList} subheader={<li />}>
                        {routes.live.map((sectionId, index) => (
                            <Slide direction="right" in={!auth0Client.getCheckingSession()} mountOnEnter unmountOnExit key={`section-${sectionId.url}`}>
                                <ul className={classes.drawerListUl}>
                                    {
                                    ('topLevel' in sectionId) && (index !== 0) &&
                                        <Divider />
                                    }
                                    {
                                    ('topLevel' in sectionId) &&
                                        <List component="div" disablePadding={index === 0}>
                                            <ListItem button
                                                key={`item-${sectionId.url}`}
                                                alignItems="flex-start"
                                                component={Link}
                                                to={`/${sectionId.url}`}
                                                selected={pathname === `/${sectionId.url}`}
                                            >
                                                <ListItemIcon>{sectionId.icon}</ListItemIcon>
                                                <ListItemText inset
                                                    className={classes.drawerListItemText}
                                                    primary={
                                                        <React.Fragment>
                                                            {sectionId.title.split('\n').map(function(i, key, array) {
                                                                return <span key={key} className={((key === 0) && (array.length > 1)) ? classes.drawerListItemTitleLine1 : ''}>{i}</span>;
                                                            })}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    }
                                    {
                                    !('topLevel' in sectionId) &&
                                        <ListSubheader className={classes.listSubheader} elevation={24}>{sectionId.title}</ListSubheader>
                                    }
                                    {
                                    !('topLevel' in sectionId) &&
                                        <List component="div" disablePadding>
                                            {('children' in sectionId) && sectionId.children.map(item => (
                                                <ListItem button
                                                    key={`item-${sectionId.url}-${item.url}`}
                                                    alignItems="flex-start"
                                                    component={Link}
                                                    to={`/${sectionId.url}/${item.url}`}
                                                    selected={pathname === `/${sectionId.url}/${item.url}`}
                                                >
                                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                                    <ListItemText inset
                                                        className={classes.drawerListItemText}
                                                        primary={
                                                            <React.Fragment>
                                                                {(item.title) && item.title.split('\n').map(function(i, key, array) {
                                                                    return <span key={key} className={((key === 0) && (array.length > 1)) ? classes.drawerListItemTitleLine1 : ''}>{i}</span>;
                                                                })}
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    }
                                </ul>
                            </Slide>
                        ))}
                        <ListItem>
                            <ReviewModal />
                        </ListItem>
                    </List>
                );
            } else {
                drawerList = (
                    <List component="nav" className={classes.drawerList} subheader={<li />}>
                        {routes.onboarding.map(sectionId => (
                            <Slide direction="right" in={!auth0Client.getCheckingSession()} mountOnEnter unmountOnExit key={`section-${sectionId.url}`}>
                                <ul className={classes.drawerListUl}>
                                    <ListSubheader className={classes.listSubheader} elevation={24}>{sectionId.title}</ListSubheader>
                                    <List component="div" disablePadding>
                                        {sectionId.children.map(item => (
                                            <ListItem button
                                                key={`item-${sectionId.url}-${item.url}`}
                                                component={Link}
                                                to={`/${sectionId.url}/${item.url}`}
                                                selected={pathname === `/${sectionId.url}/${item.url}`}
                                            >
                                                {
                                                (onboardingProgress[item.url.replace('-', '_')] < 100) &&
                                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                                }
                                                {
                                                (onboardingProgress[item.url.replace('-', '_')] === 100) &&
                                                    <ListItemIcon>
                                                        <DoneIcon color="secondary" />
                                                    </ListItemIcon>
                                                }
                                                <ListItemText inset
                                                    component="div"
                                                    className={classes.drawerListItemText}
                                                    primary={
                                                        <React.Fragment>
                                                            <span>{item.title}</span>
                                                            {
                                                            (onboardingProgress[item.url.replace('-', '_')] < 100) &&
                                                                <LinearProgress className={classes.progressBar} variant="determinate" value={onboardingProgress[item.url.replace('-', '_')]} />
                                                            }
                                                        </React.Fragment>    
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </ul>
                            </Slide>
                        ))}
                        <ListItem>
                            <ReviewModal />
                        </ListItem>
                    </List>
                );
            }

            return (
                <React.Fragment>
                    {header}
                    <Divider />
                    {drawerList}
                </React.Fragment>
            );
        }
    };

    render() {
        const { classes, handleDrawerToggle, mobileOpen } = this.props;
        let isCheckingSession = auth0Client.getCheckingSession();

        return (
            <nav className={classes.drawer}>
                derp: {isCheckingSession}
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {this.renderDrawer()}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {this.renderDrawer()}
                    </Drawer>
                </Hidden>
            </nav>
        );
    }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(Nav));