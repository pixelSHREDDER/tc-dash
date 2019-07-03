import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { URLS } from './conf';
import auth0Client from './Auth';
//import Callback from './Callback';
import NewInstance from './NewInstance/NewInstance';
import SecuredRoute from './Routes/SecuredRoute';
import Board from './Board/Board';
import Dashboard from './Dashboard/Dashboard';
import ExternalLinkPanel from './ExternalLinkPanel/ExternalLinkPanel';
import GSSocialMedia from './SocialMedia/GSSocialMedia';
import Nav from './Nav/Nav';
import TopBar from './TopBar/TopBar';
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
  Button,
  CssBaseline,
  Typography
} from '@material-ui/core';

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

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
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

  /*handleChange = event => {
    this.setState({ auth: event.target.checked });
  };*/

/*  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };
*/

  signOut = () => {
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  progress = section => {
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

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;
    const { pathname } = this.props.location;
    const { checkingSession, instance, live, mobileOpen } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pathname={pathname} handleDrawerToggle={this.handleDrawerToggle} />
          <Nav isLive={live} handleDrawerToggle={this.handleDrawerToggle} handleLogOut={this.signOut} mobileOpen={mobileOpen} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {
            !auth0Client.isAuthenticated() && !checkingSession &&
              <React.Fragment>
                <Typography variant="subtitle2" gutterBottom>
                  You must be logged into your chapter's account to continue.
                </Typography>
                <Button variant="contained" color="primary" size="large" className={classes.button} onClick={auth0Client.signIn}>Login</Button>
              </React.Fragment>
            }
            {/*auth0Client.isAuthenticated() &&
              <Dashboard instance={instance} />
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
                              checkingSession={checkingSession} />*/}
                <SecuredRoute path='/dashboard'
                              component={Dashboard}
                              instance={instance} />
                <SecuredRoute path='/new-instance'
                              component={NewInstance}
                              checkingSession={checkingSession}
                              onSubmit={this.addInstance} />
                <SecuredRoute path='/board/view-board'
                              component={Board}
                              instance={instance}
                              checkingSession={checkingSession}
                              onSubmit={this.updateInstance} />
                <SecuredRoute path='/email/email-alumni'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/email/email-donors'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/email/email-members'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/email/email-sustainers'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/email/view-stats'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/membership/export-alumni'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/membership/export-donors'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/membership/export-members'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/membership/export-sustainers'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/membership/view-alumni'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/membership/view-donors'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/membership/view-members'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/membership/view-sustainers'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/payments-finances/export-budget'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/payments-finances/export-donations'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/payments-finances/view-budget'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/payments-finances/view-donations'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/social-media/post-to-facebook-page'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/website'
                              component={Website}
                              instance={instance}
                              checkingSession={checkingSession}
                              onSubmit={this.updateInstance} />
                <SecuredRoute path='/website/edit-posts'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/website/view-posts'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/website/view-stats'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/website/write-post'
                              component={ExternalLinkPanel}
                              instance={instance} />
                <SecuredRoute path='/get-started/social-media'
                              component={GSSocialMedia}
                              instance={instance}
                              checkingSession={checkingSession}
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
