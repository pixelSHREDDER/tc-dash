import React, {Component} from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import config from './configuration.json';
import auth0Client from './Auth';
//import Callback from './Callback';
import NewInstance from './NewInstance/NewInstance';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Board from './Board/Board';
import GSSocialMedia from './SocialMedia/GSSocialMedia';
import Website from './Website/Website';
import WebsiteEditPosts from './Website/EditPosts';
import WebsiteViewPosts from './Website/ViewPosts';
import WebsiteViewSiteStats from './Website/ViewSiteStats';
import WebsiteWritePost from './Website/WritePost';
import Instance from './Instance/Instance';
//import Instances from './Instances/Instances';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
//import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import AnalyticsIcon from '@material-ui/icons/ShowChart';
import BoardIcon from '@material-ui/icons/AssignmentInd';
import BrandingIcon from '@material-ui/icons/FormatPaint';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
//import ExpandLess from '@material-ui/icons/ExpandLess';
//import ExpandMore from '@material-ui/icons/ExpandMore';
import ExportIcon from '@material-ui/icons/SaveAlt';
//import ExternalLinkIcon from '@material-ui/icons/OpenInNew';
import GetStartedIcon from '@material-ui/icons/Build';
import HelpIcon from '@material-ui/icons/Help';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MembershipIcon from '@material-ui/icons/Group';
import MenuIcon from '@material-ui/icons/Menu';
import NewIcon from '@material-ui/icons/NewReleases';
import OrganizationInfoIcon from '@material-ui/icons/Business';
import PaymentsIcon from '@material-ui/icons/AttachMoney';
import SocialMediaIcon from '@material-ui/icons/TrackChanges';
//import ViewListIcon from '@material-ui/icons/ViewList';
import WebsiteIcon from '@material-ui/icons/Web';

import AddEventIcon from 'mdi-material-ui/CalendarPlus';
import AddPostIcon from 'mdi-material-ui/FilePlus';
import AddSocialMediaIcon from 'mdi-material-ui/MessagePlus';
import AlumniIcon from 'mdi-material-ui/AccountTie';
import BrandingColorsIcon from 'mdi-material-ui/Palette';
import BrandingImagesIcon from 'mdi-material-ui/ImageMultiple';
import BylawsIcon from 'mdi-material-ui/Bank';
import ChangeBoardIcon from 'mdi-material-ui/ClipboardFlow';
import ChangePasswordIcon from 'mdi-material-ui/LockReset';
import DonationsIcon from 'mdi-material-ui/Gift';
import DonorIcon from 'mdi-material-ui/AccountHeart';
import EditEventsIcon from 'mdi-material-ui/CalendarEdit';
import EditPostsIcon from 'mdi-material-ui/FileDocumentEdit';
import EventIcon from 'mdi-material-ui/Calendar';
import FacebookIcon from 'mdi-material-ui/Facebook'
import ForgotPasswordIcon from 'mdi-material-ui/LockQuestion';
import IveBeenHackedIcon from 'mdi-material-ui/AlertOctagon';
import LaunchIcon from 'mdi-material-ui/Rocket';
import MailingAddressIcon from 'mdi-material-ui/Mailbox';
import MemberIcon from 'mdi-material-ui/Account';
import MessengerIcon from 'mdi-material-ui/FacebookMessenger'
import OtherSocialMediaIcon from 'mdi-material-ui/MessageProcessing';
import PhoneNumberIcon from 'mdi-material-ui/Dialpad'
import PodcastIcon from 'mdi-material-ui/Podcast';
import PostsIcon from 'mdi-material-ui/FileDocument';
import StartPodcastIcon from 'mdi-material-ui/Headset';
import SustainerIcon from 'mdi-material-ui/AccountConvert';
import TaglineDescriptionIcon from 'mdi-material-ui/FormatQuoteClose'
import TwitterIcon from 'mdi-material-ui/Twitter'
import UpdateBylawsIcon from 'mdi-material-ui/BankTransfer';

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
  drawerList: {
    backgroundColor: theme.palette.background.paper,
  },
  listSubheader: {
    backgroundColor: deepPurple[500],
    color: theme.palette.common.white,
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
  smallIcon: {
    fontSize: '0.75rem',
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
      live: false,
      mobileOpen: false,
      //nestedOpen: false,
      //selected: null,
      pageTitles: {
        "/website": "Website",
        "/website/write-post": "Write a Post",
        "/website/view-posts": "View Posts",
        "/website/edit-posts": "Edit Posts",
        "/website/view-stats": "View Stats",
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
      routes: {
        live: [
          {
            url: 'website',
            title: 'Website',
            subtitle: '',
            icon: <WebsiteIcon className="smallIcon" />,
            children: [
              {
                url: 'write-post',
                title: 'Write a Post',
                subtitle: '',
                icon: <AddPostIcon />
              },
              {
                url: 'view-posts',
                title: 'View Posts',
                subtitle: '',
                icon: <PostsIcon />
              },
              {
                url: 'edit-posts',
                title: 'Edit Posts',
                subtitle: '',
                icon: <EditPostsIcon />
              },
              {
                url: 'view-stats',
                title: 'View Stats',
                subtitle: '',
                icon: <AnalyticsIcon />
              },
            ]
          },
          {
            url: 'board',
            title: 'Board',
            subtitle: '',
            icon: <BoardIcon className="smallIcon" />,
            children: [
              {
                url: 'view-board',
                title: 'View Board',
                subtitle: '',
                icon: <BoardIcon />
              },
              {
                url: 'change-board',
                title: 'Change Board',
                subtitle: '',
                icon: <ChangeBoardIcon />
              },
            ]
          },
          {
            url: 'membership',
            title: 'Membership',
            subtitle: '',
            icon: <MembershipIcon className="smallIcon" />,
            children: [
              {
                url: 'view-members',
                title: 'View Members',
                subtitle: '',
                icon: <MemberIcon />
              },
              {
                url: 'export-members',
                title: 'Export Members',
                subtitle: '',
                icon: <ExportIcon />
              },
              {
                url: 'view-alumni',
                title: 'View Alumni',
                subtitle: '',
                icon: <AlumniIcon />
              },
              {
                url: 'export-alumni',
                title: 'Export Alumni',
                subtitle: '',
                icon: <ExportIcon />
              },
              {
                url: 'view-donors',
                title: 'View Donors',
                subtitle: '',
                icon: <DonorIcon />
              },
              {
                url: 'export-donors',
                title: 'Export Donors',
                subtitle: '',
                icon: <ExportIcon />
              },
              {
                url: 'view-sustainers',
                title: 'View Sustainers',
                subtitle: '',
                icon: <SustainerIcon />
              },
              {
                url: 'export-sustainers',
                title: 'Export Sustainers',
                subtitle: '',
                icon: <ExportIcon />
              },
            ]
          },
          {
            url: 'payments-finances',
            title: 'Payments & Finances',
            subtitle: '',
            icon: <PaymentsIcon className="smallIcon" />,
            children: [
              {
                url: 'view-budget',
                title: 'View Budget',
                subtitle: '',
                icon: <PaymentsIcon />
              },
              {
                url: 'export-budget',
                title: 'Export Budget',
                subtitle: '',
                icon: <ExportIcon />
              },
              {
                url: 'view-donations',
                title: 'View Donations',
                subtitle: '',
                icon: <DonationsIcon />
              },
              {
                url: 'export-donations',
                title: 'Export Donations',
                subtitle: '',
                icon: <ExportIcon />
              }
            ]
          },
          {
            url: 'email',
            title: 'Email',
            subtitle: '',
            icon: <EmailIcon className="smallIcon" />,
            children: [
              {
                url: 'email-members',
                title: 'Email Members',
                subtitle: '',
                icon: <EmailIcon />
              },
              {
                url: 'email-alumni',
                title: 'Email Alumni',
                subtitle: '',
                icon: <EmailIcon />
              },
              {
                url: 'email-donors',
                title: 'Email Donors',
                subtitle: '',
                icon: <EmailIcon />
              },
              {
                url: 'email-sustainers',
                title: 'Email Sustainers',
                subtitle: '',
                icon: <EmailIcon />
              },
              {
                url: 'view-stats',
                title: 'View Stats',
                subtitle: '',
                icon: <AnalyticsIcon />
              }
            ]
          },
          {
            url: 'social-media',
            title: 'Social Media',
            subtitle: '',
            icon: <SocialMediaIcon className="smallIcon" />,
            children: [
              {
                url: 'post-to-facebook',
                title: 'Post to Facebook',
                subtitle: '',
                icon: <FacebookIcon />
              },
              {
                url: 'send-a-tweet',
                title: 'Send a Tweet',
                subtitle: '',
                icon: <TwitterIcon />
              },
              {
                url: 'chat-in-messenger',
                title: 'Chat in Messenger',
                subtitle: '',
                icon: <MessengerIcon />
              },
              {
                url: 'post-to-other-account',
                title: 'Post To Other Account',
                subtitle: '',
                icon: <OtherSocialMediaIcon />
              },
              {
                url: 'add-account',
                title: 'Add Account',
                subtitle: '',
                icon: <AddSocialMediaIcon />
              }
            ]
          },
          {
            url: 'events',
            title: 'Events',
            subtitle: '',
            icon: <EventIcon className="smallIcon" />,
            children: [
              {
                url: 'create-an-event',
                title: 'Create an Event',
                subtitle: '',
                icon: <AddEventIcon />
              },
              {
                url: 'view-events',
                title: 'View Events',
                subtitle: '',
                icon: <EventIcon />
              },
              {
                url: 'edit-events',
                title: 'Edit Events',
                subtitle: '',
                icon: <EditEventsIcon />
              }
            ]
          },
          {
            url: 'security',
            title: 'Security',
            subtitle: '',
            icon: <EventIcon className="smallIcon" />,
            children: [
              {
                url: 'forgot-a-password',
                title: 'Forgot a Password?',
                subtitle: '',
                icon: <ForgotPasswordIcon />
              },
              {
                url: 'change-password',
                title: 'Change Password',
                subtitle: '',
                icon: <ChangePasswordIcon />
              },
              {
                url: 'ive-been-hacked',
                title: '"I\'ve Been Hacked!"',
                subtitle: '',
                icon: <IveBeenHackedIcon />
              }
            ]
          },
          {
            url: 'bylaws-constitution',
            title: 'Bylaws / Constitution',
            subtitle: '',
            icon: <BoardIcon className="smallIcon" />,
            children: [
              {
                url: 'view-bylaws-constitution',
                title: 'View Bylaws / Constitution',
                subtitle: '',
                icon: <BylawsIcon />
              },
              {
                url: 'update-bylaws-constitution',
                title: 'Update Bylaws / Constitution',
                subtitle: '',
                icon: <UpdateBylawsIcon />
              },
            ]
          },
          {
            url: 'podcasting',
            title: 'Podcasting',
            subtitle: '',
            icon: <BoardIcon className="smallIcon" />,
            children: [
              {
                url: 'view-podcast',
                title: 'View Podcast',
                subtitle: '',
                icon: <PodcastIcon />
              },
              {
                url: 'start-a-podcast',
                title: 'Start A Podcast',
                subtitle: '',
                icon: <StartPodcastIcon />
              },
            ]
          },
          {
            url: 'branding-personalization',
            title: 'Branding & Personalization',
            subtitle: '',
            icon: <BoardIcon className="smallIcon" />,
            children: [
              {
                url: 'change-branding-images',
                title: 'Change Branding Images',
                subtitle: '',
                icon: <BrandingImagesIcon />
              },
              {
                url: 'change-branding-colors',
                title: 'Change Branding Colors',
                subtitle: '',
                icon: <BrandingColorsIcon />
              },
            ]
          },
          {
            url: 'organization-info',
            title: 'Organization Info',
            subtitle: '',
            icon: <BoardIcon className="smallIcon" />,
            children: [
              {
                url: 'change-tagline-description',
                title: 'Change Tagline/Description',
                subtitle: '',
                icon: <TaglineDescriptionIcon />
              },
              {
                url: 'change-mailing-address',
                title: 'Change Mailing Address',
                subtitle: '',
                icon: <MailingAddressIcon />
              },
              {
                url: 'change-phone-number',
                title: 'Change Phone Number',
                subtitle: '',
                icon: <PhoneNumberIcon />
              },
            ]
          },
            /*
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
          */
        ],
        onboarding: [
          {
            url: 'get-started',
            title: 'Get Started',
            subtitle: '',
            icon: <WebsiteIcon className="smallIcon" />,
            children: [
              {
                url: 'organization-info',
                title: 'Organization Info',
                subtitle: '',
                icon: <OrganizationInfoIcon />,
                completed: 100,
              },
              {
                url: 'website',
                title: 'Website',
                subtitle: '',
                icon: <WebsiteIcon />,
                completed: 2,
              },
              {
                url: 'board',
                title: 'Board',
                subtitle: '',
                icon: <BoardIcon />,
                completed: 75,
              },
              {
                url: 'email',
                title: 'Email',
                subtitle: '',
                icon: <EmailIcon />,
                completed: 10,
              },
              {
                url: 'social-media',
                title: 'Social Media',
                subtitle: '',
                icon: <SocialMediaIcon />,
                completed: 25,
              },
              {
                url: 'payments-finances',
                title: 'Payments & Finances',
                subtitle: '',
                icon: <PaymentsIcon />,
                completed: 2,
              },
              {
                url: 'analytics-seo',
                title: 'Analytics & SEO',
                subtitle: '',
                icon: <AnalyticsIcon />,
                completed: 80,
              },
              {
                url: 'podcasting',
                title: 'Podcasting',
                subtitle: '',
                icon: <PodcastIcon />,
                completed: 100,
              },
              {
                url: 'bylaws-constitution',
                title: 'Bylaws / Constitution',
                subtitle: '',
                icon: <BylawsIcon />,
                completed: 2,
              },
              {
                url: 'branding-personalization',
                title: 'Branding & Personalization',
                subtitle: '',
                icon: <BrandingIcon />,
                completed: 60,
              },
            ]
          }
        ],
      },
      status: 'onboarding'
    };
    this.updateInstance = this.updateInstance.bind(this);
  }

  async componentDidMount() {
    let instanceId = null;
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession: false});
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
    this.setState({checkingSession: false});
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
    const { anchorEl, instance, live, pageTitles, routes } = this.state;
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
          (auth0Client.isAuthenticated() && this.state.live) &&
              <List component="nav" className={classes.drawerList} subheader={<li />}>
                {this.state.routes.live.map(sectionId => (
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
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText inset
                                            primary={item.title}
                                            /* secondary={
                                              <React.Fragment>
                                                {item.subtitle}
                                              </React.Fragment>
                                            } */
                              />
                            </ListItem>
                          ))}
                        </List>
                    </li>
                  </Slide>
                ))}
              </List>
            }
            {
            (auth0Client.isAuthenticated() && !this.state.live) &&
                <List component="nav" className={classes.drawerList} subheader={<li />}>
                  {this.state.routes.onboarding.map(sectionId => (
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
                            <ListItem>
                              <Button disabled variant="contained" color="secondary" size="large" className={classes.drawerButton}>
                                Launch!
                                <LaunchIcon className={classes.rightIcon} />
                              </Button>
                            </ListItem>
                          </List>
                      </li>
                    </Slide>
                  ))}
                </List>
              }
          {
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
                <SecuredRoute path='/board'
                              component={Board}
                              instance={this.state.instance}
                              checkingSession={this.state.checkingSession}
                              onSubmit={this.updateInstance} />
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
                <SecuredRoute path='/website/view-stats'
                              component={WebsiteViewSiteStats}
                              checkingSession={this.state.checkingSession} />
                <SecuredRoute path='/website/write-post'
                              component={WebsiteWritePost}
                              checkingSession={this.state.checkingSession} />
                <SecuredRoute path='/get-started/social-media'
                              component={GSSocialMedia}
                              instance={this.state.instance}
                              checkingSession={this.state.checkingSession}
                              onSubmit={this.updateInstance} />
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
