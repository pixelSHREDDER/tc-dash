import React, { Component } from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import config from './configuration.json';
import auth0Client from './Auth';
//import Callback from './Callback';
import NewInstance from './NewInstance/NewInstance';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Website from './Website/Website';
import WebsiteEditPosts from './Website/EditPosts';
import WebsiteViewPosts from './Website/ViewPosts';
import WebsiteViewSiteStats from './Website/ViewSiteStats';
import WebsiteWritePost from './Website/WritePost';
import RadioToggle from './RadioToggle/RadioToggle';
import Instance from './Instance/Instance';
//import Instances from './Instances/Instances';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import AnalyticsIcon from '@material-ui/icons/ShowChart';
import AppBar from '@material-ui/core/AppBar';
import BoardIcon from '@material-ui/icons/SupervisorAccount';
import BrandingIcon from '@material-ui/icons/FormatPaint';
import BylawsIcon from '@material-ui/icons/Gavel';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
//import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';
import Drawer from '@material-ui/core/Drawer';
import EmailIcon from '@material-ui/icons/AlternateEmail';
//import ExpandLess from '@material-ui/icons/ExpandLess';
//import ExpandMore from '@material-ui/icons/ExpandMore';
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
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OrganizationInfoIcon from '@material-ui/icons/Business';
import PaymentsIcon from '@material-ui/icons/AttachMoney';
import PodcastingIcon from '@material-ui/icons/Mic';
import SocialMediaIcon from '@material-ui/icons/TrackChanges';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WebsiteIcon from '@material-ui/icons/Web';
import { withStyles } from '@material-ui/core/styles';

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
    paddingLeft: theme.spacing.unit * 4,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerButton: {
    margin: theme.spacing.unit,
    width: drawerWidth - (theme.spacing.unit * 2),
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
  rightIcon: {
    marginLeft: theme.spacing.unit,
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

class App extends Component {
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
      pageTitles: {
        "/website": "Website",
        "/website/write-post": "Write a Post",
        "/website/view-posts": "View Posts",
        "/website/edit-posts": "Edit Posts",
        "/website/view-site-stats": "View Site Stats",
        "/website/view-search-rankings": "View Search Rankings",
        "/board": "Board",
        "/board/edit-board": "Edit Board",
        "/membership": "Membership",
        "/membership/view-members": "View Members",
        "/membership/export-members": "Export Members",
        "/membership/view-alumni": "View Alumni",
        "/membership/export-alumni": "Export Alumni",
        "/membership/view-donors": "View Donors",
        "/membership/export-donors": "Export Donors",
        "/membership/view-sustainers": "View Sustainers",
        "/membership/export-sustainers": "Export Sustainers",
        "/payments-finances": "Payments & Finances",
        "/payments-finances/view-budget": "View Budget",
        "/payments-finances/export-budget": "Export Budget",
        "/payments-finances/view-donations": "View Donations",
        "/payments-finances/export-donations": "Export Donations",
        "/email": "Email",
        "/email/email-members": "Email Members",
        "/email/email-alumni": "Email Alumni",
        "/email/email-donors": "Email Donors",
        "/email/email-sustainers": "Email Sustainers",
        "/email/view-stats": "View Stats",
        "/social-media": "Social Media",
        "/social-media/add-new": "Add New Account",
        "/social-media/add-existing": "Add Existing Account",
        "/social-media/post-to-facebook-page": "Post to Facebook Page",
        "/social-media/send-a-tweet": "Send a Tweet",
        "/social-media/chat-on-discord": "Chat on Discord",
        "/social-media/upload-to-flickr": "Upload to Flickr",
        "/social-media/view-github": "View Github",
        "/social-media/post-to-instagram": "Post to Instagram",
        "/social-media/post-in-linkedin-group": "Post in LinkedIn Group",
        "/social-media/post-in-meetup-group": "Post in Meetup Group",
        "/social-media/post-to-medium": "Post to Medium",
        "/social-media/chat-in-messenger-group": "Chat in Messenger Group",
        "/social-media/post-to-pinterest": "Post to Pinterest",
        "/social-media/post-on-subreddit": "Post on Subreddit",
        "/social-media/chat-on-slack": "Chat on Slack",
        "/social-media/new-snap": "New Snap",
        "/social-media/post-to-tumblr": "Post to Tumblr",
        "/social-media/upload-to-twitch": "Upload to Twitch",
        "/social-media/chat-on-whatsapp": "Chat on WhatsApp",
        "/social-media/upload-to-youtube": "Upload to YouTube",
        "/social-media/post-to-other-accounts": "Post to Other Accounts",
        "/events": "Events",
        "/events/create-an-event": "Create an Event",
        "/events/view-events": "View Events",
        "/events/edit-events": "Edit Events",
        "/security": "Security",
        "/security/forgot-a-password": "Forgot a Password?",
        "/security/change-a-password": "Change a Password",
        "/security/ive-been-hacked": "I've Been Hacked!",
        "/bylaws-constitution": "Bylaws/Constitution",
        "/bylaws-constitution/view-bylaws-constitution": "View Bylaws/Constitution",
        "/bylaws-constitution/update-bylaws-constitution": "Update Bylaws/Constitution",
        "/podcasting": "Podcasting",
        "/podcasting/view-podcast": "View Podcast",
        "/podcasting/start-a-podcast": "Start a Podcast",
        "/branding-personalization": "Branding & Personalization",
        "/branding-personalization/change-branding-images": "Change Branding Images",
        "/branding-personalization/change-branding-colors": "Change Branding Colors",
        "/organization-info": "Organization Info",
        "/organization-info/change-tagline-description": "Change Tagline/Description",
        "/organization-info/change-mailing-address": "Change Mailing Address",
        "/organization-info/change-phone-number": "Change Phone Number",
        "/get-started": "Get Started",
        "/get-started/organization-info": "Organization Info",
        "/get-started/website": "Website",
        "/get-started/board-hierarchy": "Board Hierarchy",
        "/get-started/email": "Email",
        "/get-started/social-media": "Social Media",
        "/get-started/payments-finances": "Payments & Finances",
        "/get-started/analytics-seo": "Analytics & SEO",
        "/get-started/podcasting": "Podcasting",
        "/get-started/bylaws-constitution": "Bylaws & Constitution",
        "/get-started/branding-personalization": "Branding & Personalization",
        "/get-help": "Get Help",
      },
    };
    this.updateInstance = this.updateInstance.bind(this);
  }

  async componentDidMount() {
    let instanceId = null;
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession:false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      instanceId = await auth0Client.getProfile().sub;
      this.forceUpdate();
      this.getInstance(instanceId);
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getInstance(instanceId), 1000);
        this.setState({ intervalIsSet: interval });
      }
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
    //this.refreshInstance();
  }

  componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
  }

  async getInstances() {
    const token = await auth0Client.getIdToken();
    const data = (await axios.get(`http://${config.dataURL[config.env]}/getData`,
    { headers: { 'Authorization': `Bearer ${token}` }}
    )).data;
    console.log(data);
    /*fetch(`http://${config.dataURL[config.env]}/getData`, {
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
    const data = (await axios.get(`http://${config.dataURL[config.env]}/instance/${owner}`,
    { headers: { 'Authorization': `Bearer ${token}`}}
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
      axios.post(`http://${config.dataURL[config.env]}/addInstance`, instance,
        {headers: { 'Authorization': `Bearer ${token}` }}
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

    axios.delete(`http://${config.dataURL[config.env]}/deleteInstance`, {
      data: {
        //owner: objOwnerToDelete
        owner: owner
      },
      headers: { 'Authorization': `Bearer ${token}` }}
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

      const data = (await axios.post(`http://${config.dataURL[config.env]}/updateInstance/${owner}`,
        { data: update },
        { headers: { 'Authorization': `Bearer ${token}` }}
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
      //const instance = (await axios.get(`http://${config.dataURL[config.env]}/${params.instanceId}`)).data;
      const instance = (await axios.get(`http://${config.dataURL[config.env]}/${id}`, {
        //headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        headers: { 'Authorization': `Bearer ${token}` }
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
    await axios.put(`http://${config.dataURL[config.env]}/${instance.id}`, {
      instance,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
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
    const { anchorEl, instance, pageTitles } = this.state;
    const { pathname } = this.props.location;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
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
              <div>
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
              </div>
            </div>
          }
          {
          auth0Client.isAuthenticated() &&
            <Divider />
          }
          {
          auth0Client.isAuthenticated() &&
              <List component="nav">
              {
              this.state.live &&
                <ListItem button
                          component={Link}
                          to={"/website"}
                          selected={pathname === "/website"}
                >
                  <ListItemIcon>{<WebsiteIcon />}</ListItemIcon>
                  <ListItemText inset primary={this.state.pageTitles["/website"]}/>
                  {/*this.state.nestedOpen ? <ExpandLess /> : <ExpandMore />*/}
                </ListItem>
              }
              {/*<Collapse in={this.state.nestedOpen} timeout="auto" unmountOnExit>*/}
              {
              this.state.live &&
                <List component="div" disablePadding>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/website/write-post"
                            //onClick={() => this.handleListItemClick(1)}
                            //selected={(selected === 1) || (pathname === "/website/write-post")}
                            selected={pathname === "/website/write-post"}
                  >
                    <ListItemIcon><OrganizationInfoIcon /></ListItemIcon>
                    <ListItemText inset
                                  primary={this.state.pageTitles["/website/write-post"]}
                                  secondary={
                                    <React.Fragment>
                                      Do the thing!
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/website/view-posts"
                            selected={pathname === "/website/view-posts"}
                  >
                    <ListItemIcon><OrganizationInfoIcon /></ListItemIcon>
                    <ListItemText inset
                                  primary={this.state.pageTitles["/website/view-posts"]}
                                  secondary={
                                    <React.Fragment>
                                      Do the thing!
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/website/edit-posts"
                            selected={pathname === "/website/edit-posts"}
                  >
                    <ListItemIcon><OrganizationInfoIcon /></ListItemIcon>
                    <ListItemText inset
                                  primary={this.state.pageTitles["/website/edit-posts"]}
                                  secondary={
                                    <React.Fragment>
                                      Do the thing!
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/website/view-site-stats"
                            selected={pathname === "/website/view-site-stats"}
                  >
                    <ListItemIcon><OrganizationInfoIcon /></ListItemIcon>
                    <ListItemText inset
                                  primary={this.state.pageTitles["/website/view-site-stats"]}
                                  secondary={
                                    <React.Fragment>
                                      Do the thing!
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                </List>
              }
              {/*</Collapse>*/}
              {
              !this.state.live &&
                <ListItem button
                          component={Link}
                          to="/get-started"
                          selected={pathname === "/get-started"}
                >
                  <ListItemIcon>{<GetStartedIcon />}</ListItemIcon>
                  <ListItemText inset primary={this.state.pageTitles["/get-started"]}/>
                </ListItem>
              }
              {
              !this.state.live &&
                <List component="div" disablePadding>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/organization-info"
                            selected={pathname === "/get-started/organization-info"}
                  >
                    {
                    (this.state.completed.organizationInfo < 100) &&
                      <ListItemIcon>
                        <OrganizationInfoIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.organizationInfo === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/organization-info"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.organizationInfo < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.organizationInfo} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/website"
                            selected={pathname === "/get-started/website"}
                  >
                    {
                    (this.state.completed.website < 100) &&
                      <ListItemIcon>
                        <WebsiteIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.website === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/website"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.website < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.website} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/board-hierarchy"
                            selected={pathname === "/get-started/board-hierarchy"}
                  >
                    {
                    (this.state.completed.boardHierarchy < 100) &&
                      <ListItemIcon>
                        <BoardIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.boardHierarchy === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/board-hierarchy"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.boardHierarchy < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.boardHierarchy} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/email"
                            selected={pathname === "/get-started/email"}
                  >
                    {
                    (this.state.completed.email < 100) &&
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.email === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/email"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.email < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.email} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/social-media"
                            selected={pathname === "/get-started/social-media"}
                  >
                    {
                    (this.state.completed.socialMedia < 100) &&
                      <ListItemIcon>
                        <SocialMediaIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.socialMedia === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/social-media"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.socialMedia < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.socialMedia} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/payments-finances"
                            selected={pathname === "/get-started/payments-finances"}
                  >
                    {
                    (this.state.completed.paymentsFinances < 100) &&
                      <ListItemIcon>
                        <PaymentsIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.paymentsFinances === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/payments-finances"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.paymentsFinances < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.paymentsFinances} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/analytics-seo"
                            selected={pathname === "/get-started/analytics-seo"}
                  >
                    {
                    (this.state.completed.analyticsSeo < 100) &&
                      <ListItemIcon>
                        <AnalyticsIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.analyticsSeo === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/analytics-seo"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.analyticsSeo < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.analyticsSeo} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/podcasting"
                            selected={pathname === "/get-started/podcasting"}
                  >
                    {
                    (this.state.completed.podcasting < 100) &&
                      <ListItemIcon>
                        <PodcastingIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.podcasting === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/podcasting"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.podcasting < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.podcasting} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/bylaws-constitution"
                            selected={pathname === "/get-started/bylaws-constitution"}
                  >
                    {
                    (this.state.completed.bylawsConstitution < 100) &&
                      <ListItemIcon>
                        <BylawsIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.bylawsConstitution === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/bylaws-constitution"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.bylawsConstitution < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.bylawsConstitution} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                  <ListItem button
                            className={classes.nested}
                            alignItems="flex-start"
                            component={Link}
                            to="/get-started/branding-personalization"
                            selected={pathname === "/get-started/branding-personalization"}
                  >
                    {
                    (this.state.completed.brandingPersonalization < 100) &&
                      <ListItemIcon>
                        <BrandingIcon />
                      </ListItemIcon>
                    }
                    {
                    (this.state.completed.brandingPersonalization === 100) &&
                      <ListItemIcon>
                        <DoneIcon color="secondary" />
                      </ListItemIcon>
                    }
                    <ListItemText inset
                                  primary={this.state.pageTitles["/get-started/branding-personalization"]}
                                  secondary={
                                    <React.Fragment>
                                      {
                                      (this.state.completed.brandingPersonalization < 100) &&
                                        <LinearProgress variant="determinate" value={this.state.completed.brandingPersonalization} />
                                      }
                                    </React.Fragment>
                                  }
                    />
                  </ListItem>
                </List>
              }
              {
              !this.state.live &&
                <ListItem>
                  <Button variant="contained" color="secondary" size="large" className={classes.drawerButton}>
                    Launch!
                    <WebsiteIcon className={classes.rightIcon} />
                  </Button>
                </ListItem>
              }
            </List>
          }
          {
          auth0Client.isAuthenticated() &&
            <Divider />
          }
          {
          auth0Client.isAuthenticated() &&
            <List>
              {/*['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon><SocialMediaIcon /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))*/}
              <ListItem button
                        component={Link}
                        to="/get-help"
                        selected={pathname === "/get-help"}
              >
                <ListItemIcon>{<HelpIcon />}</ListItemIcon>
                <ListItemText primary="Get Help"/>
              </ListItem>
            </List>
          }
        </div>
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
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  You must be logged into your chapter's account to continue.
                </Typography>
                <Button variant="contained" color="primary" size="large" className={classes.button} onClick={auth0Client.signIn}>Login</Button>
              </div>
            }
            {/*
            auth0Client.isAuthenticated() &&*/}
              <div>
                <RadioToggle/>
                {/*<RadioToggle/>
                <Route exact path='/' component={Instances}/>
                <Route exact path='/instance/:instanceId' component={Instance}/>
                <Route exact path='/callback' component={Callback}/>*/}
                <Route exact path='/instance/:instanceId' component={Instance}/>
                {/*<SecuredRoute path='/instance:instanceId'
                              component={Instance}
                              checkingSession={this.state.checkingSession} />*/}
                <SecuredRoute path='/new-instance'
                              component={NewInstance}
                              checkingSession={this.state.checkingSession}
                              onSubmit={this.addInstance} />
                <SecuredRoute path='/website'
                              component={Website}
                              instance={this.state.instance}
                              checkingSession={this.state.checkingSession}
                              onSubmit={this.updateInstance} />
                <SecuredRoute path='/website/edit-posts'
                              component={WebsiteEditPosts}
                              checkingSession={this.state.checkingSession} />
                <SecuredRoute path='/website/view-posts'
                              component={WebsiteViewPosts}
                              checkingSession={this.state.checkingSession} />
                <SecuredRoute path='/website/view-site-stats'
                              component={WebsiteViewSiteStats}
                              checkingSession={this.state.checkingSession} />
                <SecuredRoute path='/website/write-post'
                              component={WebsiteWritePost}
                              checkingSession={this.state.checkingSession} />
              </div>
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

//export default withRouter(App);
export default withRouter(withStyles(styles, { withTheme: true })(App));
