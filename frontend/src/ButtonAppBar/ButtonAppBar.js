import React from 'react';
//import {Link, withRouter} from 'react-router-dom';
import {Link, Route, withRouter} from 'react-router-dom';
import Callback from '../Callback';
import NewInstance from '../NewInstance/NewInstance';
import SecuredRoute from '../SecuredRoute/SecuredRoute';
import RadioToggle from '../RadioToggle/RadioToggle';
import Instance from '../Instance/Instance';
import Instances from '../Instances/Instances';
import PropTypes from 'prop-types';
import auth0Client from '../Auth';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import AnalyticsIcon from '@material-ui/icons/ShowChart';
import AppBar from '@material-ui/core/AppBar';
import BoardHierarchyIcon from '@material-ui/icons/SupervisorAccount';
import BrandingIcon from '@material-ui/icons/FormatPaint';
import BylawsIcon from '@material-ui/icons/Gavel';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GetStartedIcon from '@material-ui/icons/Build';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
//import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
//import MenuItem from '@material-ui/core/MenuItem';
import OrgInfoIcon from '@material-ui/icons/Business';
import PaymentsIcon from '@material-ui/icons/AttachMoney';
import PodcastingIcon from '@material-ui/icons/Mic';
import SocialMediaIcon from '@material-ui/icons/TrackChanges';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WebsiteIcon from '@material-ui/icons/Web';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  avatar: {
    width: 28,
    height: 28,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ButtonAppBar extends React.Component {
  state = {
    auth: auth0Client.isAuthenticated(),
    anchorEl: null,
    mobileOpen: false,
    nestedOpen: true,
    selected: null,
    pageTitles: {
      "/get-started": "Get Started",
      "/get-help": "Get Help",
    },
    completed: {
      "orgInfo": 10,
    }
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleListItemClick = index => {
    if (index === 0) {
      this.setState(state => ({ nestedOpen: !state.nestedOpen, selected: null }));
    } else {
      this.setState({ selected: index });
    }
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  signOut = () => {
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  progress = (section) => {
    const { completed } = this.state;
    if (completed[section] === 100) {
      this.setState({
        completed: {
          [section]: 0
        }
      });
    } else {
      const diff = Math.random() * 10;
      this.setState({
        completed: {
          [section]: Math.min(completed[section] + diff, 100)
        }
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, selected, pageTitles } = this.state;
    const { pathname } = this.props.location;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
        <div className={classes.toolbar}>
        {/*<div className={classes.toolbar} />*/}
          {
            !auth0Client.isAuthenticated() &&
            <Button color="inherit" onClick={auth0Client.signIn}>Login</Button>
          }
          {
            auth0Client.isAuthenticated() &&
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={auth0Client.getProfile().name} src="/static/images/avatar/1.jpg" className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText primary="Welcome!"
                />
              </ListItem>
            </List>
            /*<div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
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
                </div>*/
            }
            </div>
        <Divider />
        <List component="nav" subheader={<ListSubheader component="div">Let's get you ready for launch!</ListSubheader>}>
          <ListItem button
                    component={Link}
                    to="/get-started"
                    onClick={() => this.handleListItemClick(0)}
                    selected={(selected === 0) || (pathname === "/get-started")}
          >
            <ListItemIcon>{<GetStartedIcon />}</ListItemIcon>
            <ListItemText inset primary="Get Started"/>
            {this.state.nestedOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.nestedOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(1)}
                        selected={(selected === 1) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<OrgInfoIcon />}</ListItemIcon>
                <ListItemText inset
                              primary="Organization Info"
                              secondary={
                                <React.Fragment>
                                  <LinearProgress variant="determinate" value={this.state.completed.orgInfo} />
                                </React.Fragment>
                              }
                />
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(2)}
                        selected={(selected === 2) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<WebsiteIcon />}</ListItemIcon>
                <ListItemText inset primary="Website"/>
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(3)}
                        selected={(selected === 3) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<BoardHierarchyIcon />}</ListItemIcon>
                <ListItemText inset primary="Board Hierarchy"/>
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(4)}
                        selected={(selected === 4) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<EmailIcon />}</ListItemIcon>
                <ListItemText inset primary="Email"/>
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/social-media"
                        onClick={() => this.handleListItemClick(5)}
                        selected={(selected === 5) || (pathname === "/social-media")}
              >
                <ListItemIcon>{<SocialMediaIcon />}</ListItemIcon>
                <ListItemText inset primary="Social Media"/>
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(6)}
                        selected={(selected === 6) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<PaymentsIcon />}</ListItemIcon>
                <ListItemText inset primary="Payments & Finances"/>
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(7)}
                        selected={(selected === 7) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<AnalyticsIcon />}</ListItemIcon>
                <ListItemText inset primary="Analytics & SEO"/>
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(8)}
                        selected={(selected === 8) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<PodcastingIcon />}</ListItemIcon>
                <ListItemText inset primary="Podcasting"/>
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(9)}
                        selected={(selected === 9) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<BylawsIcon />}</ListItemIcon>
                <ListItemText inset primary="Bylaws/Constitution"/>
              </ListItem>
              <ListItem button
                        className={classes.nested}
                        alignItems="flex-start"
                        component={Link}
                        to="/org-info"
                        onClick={() => this.handleListItemClick(10)}
                        selected={(selected === 10) || (pathname === "/org-info")}
              >
                <ListItemIcon>{<BrandingIcon />}</ListItemIcon>
                <ListItemText inset primary="Branding & Personalization"/>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          {/*['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon><SocialMediaIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))*/}
          <li>
            <ListItem button
                      component={Link}
                      to="/get-help"
                      onClick={() => this.handleListItemClick(1)}
                      selected={(selected === 1) || (pathname === "/get-help")}
            >
              <ListItemIcon>{<HelpIcon />}</ListItemIcon>
              <ListItemText primary="Get Help"/>
            </ListItem>
          </li>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {pageTitles[pathname]}
            </Typography>
          </Toolbar>
        </AppBar>
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
              {drawer}
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
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <RadioToggle/>
          <Route exact path='/' component={Instances}/>
          <Route exact path='/instance/:instanceId' component={Instance}/>
          <Route exact path='/callback' component={Callback}/>
          <SecuredRoute path='/new-instance'
                        component={NewInstance}
                        checkingSession={this.state.checkingSession} />
          {/*<Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
            elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
            hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
            viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
            Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
            ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
            sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
            In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
            sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo
            viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
            </Typography>*/}
            </main>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(ButtonAppBar));
