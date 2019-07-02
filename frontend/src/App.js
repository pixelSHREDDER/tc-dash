import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { URLS } from './conf';
import auth0Client from './Auth';
//import Callback from './Callback';
import NewInstance from './NewInstance/NewInstance';
import { pageTitles, routes } from './Routes/Routes';
import SecuredRoute from './Routes/SecuredRoute';
import ReviewModal from './ReviewModal/ReviewModal';
import Board from './Board/Board';
import Dashboard from './Dashboard/Dashboard';
import ExternalLinkPanel from './ExternalLinkPanel/ExternalLinkPanel';
import GSSocialMedia from './SocialMedia/GSSocialMedia';
import Website from './Website/Website';
/*import WebsiteEditPosts from './Website/EditPosts';
import WebsiteViewPosts from './Website/ViewPosts';
import WebsiteViewSiteStats from './Website/ViewSiteStats';
import WebsiteWritePost from './Website/WritePost';*/
import Instance from './Instance/Instance';
//import Instances from './Instances/Instances';

import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, green, red } from '@material-ui/core/colors';
import {
  AppBar,
  Avatar,
  Button,
  //Collapse,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core';

import {
  //AccountCircle,
  Done as DoneIcon,
  //ExpandLess as ExpandLessIcon,
  //ExpandMore as ExpandMoreIcon,
  //OpenInNew as ExternalLinkIcon,
  //Help as HelpIcon,
  Menu as MenuIcon,
  //ViewList as ViewListIcon
 } from '@material-ui/icons';

 //import { Rocket as LaunchIcon } from 'mdi-material-ui';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: green,
    error: red
  },
  typography: {
    useNextVariants: true,
  },
})

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
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
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

const Callback = () => (
  <CircularProgress />
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: auth0Client.isAuthenticated(),
      anchorEl: null,
      checkingSession: true,
      completed: {
        "organizationInfo": 100,
        "website": 2,
        "boardHierarchy": 2,
        "email": 2,
        "socialMedia": 2,
        "paymentsFinances": 2,
        "analyticsSeo": 2,
        "podcasting": 2,
        "bylawsConstitution": 2,
        "brandingPersonalization": 2,
      },
      //instances: [],
      instance: null,
      intervalIsSet: false,
      live: true,
      mobileOpen: false,
      //nestedOpen: false,
      //selected: null,
      status: 'onboarding'
    };
    this.updateInstance = this.updateInstance.bind(this);
  }

  async componentDidMount() {
    let instanceId = null;
    if (this.props.location.pathname === 'callback') return;
    /*if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession: false});
      return;
    }*/
    try {
      await auth0Client.renewTokens();
      this.forceUpdate();
      instanceId = await auth0Client.getProfile().sub;
      this.getInstance(instanceId);
      this.setState({ checkingSession: false });
      //this.setState({ checkingSession: false });
    /*try {
      await auth0Client.checkSession();
      instanceId = await auth0Client.getProfile().sub;
      this.forceUpdate();
      this.getInstance(instanceId);*/
      /* older
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getInstance(instanceId), 1000);
        this.setState({ intervalIsSet: interval });
      }*/
      //this.setState({checkingSession: false});
      /* older
      this.refreshInstance();*/
    } catch (err) {
      console.error(err);
      this.setState({ checkingSession: false });
      //this.setState({checkingSession: false});
      /*if (err.error !== 'login_required') console.log(err.error);
      this.setState({checkingSession: false});*/
    }
    //this.setState({ checkingSession: false });
  }

  checkAuthentication = async (props) => {
    try {
      await auth0Client.handleAuthentication();
      props.history.replace('/');
    } catch(error) {
      console.log('an error occured checking authentication');
      console.error(error);
    }
  }

  componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
  }

  async getInstances() {
    const token = await auth0Client.getIdToken();
    const data = (await axios.get(`http://${ URLS.dataUrl }/getData`,
    { headers: { 'Authorization': `Bearer ${ token }` }}
    )).data;
    console.log(data);
    /*fetch(`http://${ URLS.dataUrl }/getData`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',  
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(data => data.json())*/
      /*.then(res => this.setState({
        instances: res.data
      }));*/
      /*.then((res) => console.log(res.data));*/
  };

  async getInstance(owner) {
    const token = await auth0Client.getIdToken();
    const data = (await axios.get(`http://${ URLS.dataUrl }/instance/${ owner }`,
    { headers: { 'Authorization': `Bearer ${ token }`}}
    )).data;
    this.setState({
      instance: data.data[0]
    })
    console.log(this.state.instance);
  };

  async addInstance(instance) {
    const token = await auth0Client.getIdToken();
    //const owner = instance.owner;
    /*let currentIds = this.state.instances.map(data => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }*/
      axios.post(`http://${ URLS.dataUrl }/addInstance`, instance,
        {headers: { 'Authorization': `Bearer ${ token }` }}
      );
  };

  async deleteInstance(owner) {
    const token = await auth0Client.getIdToken();
    /*let objOwnerToDelete = null;
    this.state.instances.forEach(ins => {
      if (ins.owner == owner) {
        objOwnerToDelete = ins.owner;
      }
    });*/

    axios.delete(`http://${ URLS.dataUrl }/deleteInstance`, {
      data: {
        //owner: objOwnerToDelete
        owner: owner
      },
      headers: { 'Authorization': `Bearer ${ token }` }}
    );
  };

  async updateInstance(owner, update) {
    try {
      const token = await auth0Client.getIdToken();
      /*let objOwnerToUpdate = null;
      this.state.instances.forEach(ins => {
        if (ins.owner == ownerToUpdate) {
          objOwnerToUpdate = ins.owner;
        }
      });*/

      const data = (await axios.post(`http://${ URLS.dataUrl }/updateInstance/${ owner }`,
        { data: update },
        { headers: { 'Authorization': `Bearer ${ token }` }}
      )).data;
      this.setState({
        instance: data.data
      })
    } catch (err) {
      console.log(err);
      //if (err.response.status===401 && err.config) {

      //}
    }
  };

  /*async refreshInstance() {
    try {
      const token = await auth0Client.getIdToken();
      const id = await auth0Client.getProfile().sub;
      //const instance = (await axios.get(`http://${ URLS.dataUrl }/${ params.instanceId }`)).data;
      const instance = (await axios.get(`http://${ URLS.dataUrl }/${ id }`, {
        //headers: { 'Authorization': `Bearer ${ auth0Client.getIdToken() }` }
        headers: { 'Authorization': `Bearer ${ token }` }
      })).data;
      this.setState({
          instance,
      });
    } catch (err) {
      //console.log(err.config);
      if (err.response.status===401 && err.config) {

      }
    }
  }*/

  /*async saveInstance(instance) {
    console.log(instance);
    await axios.put(`http://${ URLS.dataUrl }/${ instance.id }`, {
      instance,
    }, {
      headers: { 'Authorization': `Bearer ${ auth0Client.getIdToken() }` }
    });*/
    /*this.setState({
      instance,
     });*/
    /*await this.refreshInstance();
  }*/

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

/*  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };
*/
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
    const { anchorEl } = this.state;
    const { pathname } = this.props.location;
    const open = Boolean(anchorEl);

    const drawer = (
      <React.Fragment>
        {
        !auth0Client.isAuthenticated() &&
          <div className={classes.toolbar}>
            {/*<Button onClick={auth0Client.signIn}>Login</Button>*/}
          </div>
        }
        {
        !auth0Client.isAuthenticated() &&
          <Divider />
        }
        {
        auth0Client.isAuthenticated() &&
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
          }
          {
          auth0Client.isAuthenticated() &&
            <Divider />
          }
          {
          (auth0Client.isAuthenticated() && this.state.live) &&
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
            }
            {
            (auth0Client.isAuthenticated() && !this.state.live) &&
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
              }
          {/*
          auth0Client.isAuthenticated() &&
            <Divider />
          }
          {
          auth0Client.isAuthenticated() &&
            <List>
              <ListItem button
                        component={Link}
                        to="/get-help"
                        selected={pathname === "/get-help"}
              >
                <ListItemIcon>{<HelpIcon />}</ListItemIcon>
                <ListItemText primary="Get Help"/>
              </ListItem>
            </List>
          */}
        </React.Fragment>
    );

    return (
      <MuiThemeProvider theme={theme}>
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
            {
            !auth0Client.isAuthenticated() && !this.state.checkingSession &&
              <React.Fragment>
                <Typography variant="subtitle2" gutterBottom>
                  You must be logged into your chapter's account to continue.
                </Typography>
                <Button variant="contained" color="primary" size="large" className={classes.button} onClick={auth0Client.signIn}>Login</Button>
              </React.Fragment>
            }
            {/*auth0Client.isAuthenticated() &&
              <Dashboard instance={this.state.instance} />
            */}
              <React.Fragment>
                {/*<RadioToggle/>
                <Route exact path='/' component={Instances}/>
                <Route exact path='/instance/:instanceId' component={Instance}/>*/}
                {/*<Route exact path='/callback' component={Callback}/>*/}
                <Route path="/callback" render={ (props) => {
                  this.checkAuthentication(props);
                  return (<Callback />);
                }} />
                <Route exact path='/instance/:instanceId' component={Instance} />
                {/*<SecuredRoute path='/instance:instanceId'
                              component={Instance}
                              checkingSession={this.state.checkingSession} />*/}
                <SecuredRoute path='/dashboard'
                              component={Dashboard}
                              instance={this.state.instance} />
                <SecuredRoute path='/new-instance'
                              component={NewInstance}
                              checkingSession={this.state.checkingSession}
                              onSubmit={this.addInstance} />
                <SecuredRoute path='/board/view-board'
                              component={Board}
                              instance={this.state.instance}
                              checkingSession={this.state.checkingSession}
                              onSubmit={this.updateInstance} />
                <SecuredRoute path='/email/email-alumni'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/email/email-donors'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/email/email-members'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/email/email-sustainers'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/email/view-stats'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/membership/export-alumni'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/membership/export-donors'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/membership/export-members'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/membership/export-sustainers'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/membership/view-alumni'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/membership/view-donors'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/membership/view-members'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/membership/view-sustainers'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/payments-finances/export-budget'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/payments-finances/export-donations'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/payments-finances/view-budget'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/payments-finances/view-donations'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/social-media/post-to-facebook-page'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/website'
                              component={Website}
                              instance={this.state.instance}
                              checkingSession={this.state.checkingSession}
                              onSubmit={this.updateInstance} />
                <SecuredRoute path='/website/edit-posts'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/website/view-posts'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/website/view-stats'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/website/write-post'
                              component={ExternalLinkPanel}
                              instance={this.state.instance} />
                <SecuredRoute path='/get-started/social-media'
                              component={GSSocialMedia}
                              instance={this.state.instance}
                              checkingSession={this.state.checkingSession}
                              onSubmit={this.updateInstance} />
              </React.Fragment>
            {/*}*/}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(App));
