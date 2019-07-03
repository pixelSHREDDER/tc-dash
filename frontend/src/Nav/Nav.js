import React from 'react';
import { Link, withRouter } from 'react-router-dom';
//import PropTypes from 'prop-types';
import auth0Client from '../Auth';
import { routes } from '../Routes/Routes';
import ReviewModal from '../ReviewModal/ReviewModal';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import {
    Avatar,
    //Collapse,
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
import {
    //AccountCircle,
    Done as DoneIcon,
    //ExpandLess as ExpandLessIcon,
    //ExpandMore as ExpandMoreIcon,
    //OpenInNew as ExternalLinkIcon,
    //Help as HelpIcon,
    //ViewList as ViewListIcon
} from '@material-ui/icons';
 //import { Rocket as LaunchIcon } from 'mdi-material-ui';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  /*nested: {
    paddingLeft: theme.spacing(4),
  },*/
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  /*drawerButton: {
    margin: theme.spacing(1),
    width: drawerWidth - (theme.spacing(2)),
  },*/
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
  /*smallIcon: {
    fontSize: '0.75rem',
  },*/
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
});

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          anchorEl: null,
          mobileOpen: false,
          //nestedOpen: false,
          //selected: null,
        };
        this.renderDrawer = this.renderDrawer.bind(this);
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    /*handleListItemClick = index => {
        if (index === 0) {
        this.setState(state => ({ nestedOpen: !state.nestedOpen, selected: null }));
        } else {
        this.setState({ selected: index });
        }
    };*/

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    renderDrawer = () => {
        const { classes, isLive } = this.props;
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
                            {/*<ListItem alignItems="flex-start">*/}
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt={auth0Client.getProfile().nickname}
                                        src={auth0Client.getProfile().picture}
                                        className={classes.avatar}
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={"Hi, " + auth0Client.getProfile().nickname + "!"}/>
                                {/*<AccountCircle button
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
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
                                    onClose={this.handleClose}
                            >
                                <MenuItem onClick={() => {this.signOut()}}>Logout</MenuItem>
                            </Menu>
                        </List>
                        {/*<IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
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
                            <Slide direction="right" in={!this.state.checkingSession} mountOnEnter unmountOnExit key={`section-${sectionId.url}`}>
                                <ul className={classes.drawerListUl}>
                                    {/* <ListSubheader>{sectionId.icon} {sectionId.title}</ListSubheader> */}
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
                                                    //onClick={() => this.handleListItemClick(1)}
                                                    //selected={(selected === 1) || (pathname === `/${sectionId.url}/${item.url}`)}
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
                                                                {/*
                                                                (item.link) &&
                                                                    <ExternalLinkIcon className={classes.smallIcon} />
                                                                */}
                                                            </React.Fragment>
                                                        }
                                                        /*primary={item.title}*/
                                                        /* secondary={
                                                            <React.Fragment>
                                                                {item.subtitle}
                                                            </React.Fragment>
                                                        } */
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    }
                                </ul>
                            </Slide>
                        ))}
                        <ListItem>
                            <ReviewModal isLive={true}></ReviewModal>
                        </ListItem>
                    </List>
                );
            } else {
                drawerList = (
                    <List component="nav" className={classes.drawerList} subheader={<li />}>
                        {routes.onboarding.map(sectionId => (
                            <Slide direction="right" in={!this.state.checkingSession} mountOnEnter unmountOnExit>
                                <li key={`section-${sectionId.url}`}>
                                    {/* <ListSubheader>{sectionId.icon} {sectionId.title}</ListSubheader> */}
                                    <ListSubheader className={classes.listSubheader} elevation={24}>{sectionId.title}</ListSubheader>
                                    <List component="div" disablePadding>
                                        {sectionId.children.map(item => (
                                            <ListItem button
                                                    key={`item-${sectionId.url}-${item.url}`}
                                                    alignItems="flex-start"
                                                    component={Link}
                                                    to={`/${sectionId.url}/${item.url}`}
                                                    //onClick={() => this.handleListItemClick(1)}
                                                    //selected={(selected === 1) || (pathname === `/${sectionId.url}/${item.url}`)}
                                                    selected={pathname === `/${sectionId.url}/${item.url}`}
                                            >
                                                {
                                                (item.completed < 100) &&
                                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                                }
                                                {
                                                (item.completed === 100) &&
                                                    <ListItemIcon>
                                                        <DoneIcon color="secondary" />
                                                    </ListItemIcon>
                                                }
                                                <ListItemText inset
                                                    primary={item.title}
                                                    secondary={
                                                        <React.Fragment>
                                                            {/*{item.subtitle}*/}
                                                            {
                                                            (item.completed < 100) &&
                                                                <LinearProgress variant="determinate" value={item.completed} />
                                                            }
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                        {/*<ListItem>
                                            <Button disabled variant="contained" color="secondary" size="large" className={classes.drawerButton}>
                                                Launch!
                                                <LaunchIcon className={classes.rightIcon} />
                                            </Button>
                                        </ListItem>*/}
                                    </List>
                                </li>
                            </Slide>
                        ))}
                        <ListItem>
                            <ReviewModal isLive={false}></ReviewModal>
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
        const { classes } = this.props;

        return (
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                    container={this.props.container}
                    variant="temporary"
                    anchor="left"
                    open={this.state.mobileOpen}
                    onClose={this.handleDrawerToggle}
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

/*Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};*/

export default withRouter(withStyles(styles, { withTheme: true })(Nav));