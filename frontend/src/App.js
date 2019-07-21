import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setInstance, updateInstance } from './redux/actions/instanceActions';
import { URLS } from './conf';
import auth0Client from './Auth';
//import Callback from './Callback';
import NewInstance from './NewInstance/NewInstance';
import SecuredRoute from './Routes/SecuredRoute';
import AppFrame from './AppFrame/AppFrame';
import Board from './Board/Board';
import Dashboard from './Dashboard/Dashboard';
import EditWebsitePosts from './Website/EditWebsitePosts';
import EmailMembers from './Email/EmailMembers';
import ExportAlumni from './Membership/ExportAlumni';
import ExportBudget from './PaymentsFinances/ExportBudget';
import ExportDonations from './PaymentsFinances/ExportDonations';
import ExportDonors from './Membership/ExportDonors';
import ExportMembers from './Membership/ExportMembers';
import ExportSustainers from './Membership/ExportSustainers';
import GSSocialMedia from './GetStarted/GSSocialMedia';
import PostToFacebookPage from './SocialMedia/PostToFacebookPage';
import SendATweet from './SocialMedia/SendATweet';
import ViewAlumni from './Membership/ViewAlumni';
import ViewBudget from './PaymentsFinances/ViewBudget';
import ViewDonations from './PaymentsFinances/ViewDonations';
import ViewDonors from './Membership/ViewDonors';
import ViewEmailStats from './Email/ViewEmailStats';
import ViewMembers from './Membership/ViewMembers';
import ViewSustainers from './Membership/ViewSustainers';
import ViewWebsitePosts from './Website/ViewWebsitePosts';
import ViewWebsiteStats from './Website/ViewWebsiteStats';
import WriteWebsitePost from './Website/WriteWebsitePost';
import Website from './Website/Website';
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
  /*constructor() {
    super();
    this.state = {
      //auth: auth0Client.isAuthenticated(),
      //instances: [],
      intervalIsSet: false,
    };

    //this.updateInstance = this.updateInstance.bind(this);
  }*/

  state = {
    intervalIsSet: false,
  };

  async componentDidMount() {
    if (this.props.location.pathname === 'callback') return;
    this.getInstance();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.instance) this.forceUpdate();
  }

  getInstance = async () => {
    const { setInstance } = this.props;
    let instanceId = null;
    let token = null;
    let data = {};

    try {
        await auth0Client.renewTokens();
        instanceId = await auth0Client.getProfile().sub;
        token = await auth0Client.getIdToken();
        data = (await axios.get(`http://${ URLS.dataUrl }/instance/${ instanceId }`,
        { headers: { 'Authorization': `Bearer ${ token }`}}
        )).data;
        console.log(data);
        setInstance(data.data[0]);
    } catch (err) {
        console.error(err);
    }
  }

  updateInstance = async (update) => {
    const { updateInstance } = this.props;
    let token = null;
    let data = {};
    
    try {
      token = await auth0Client.getIdToken();
      data = (await axios.post(`http://${ URLS.dataUrl }/updateInstance/${ this.props.instance.id }`,
        { data: update },
        { headers: { 'Authorization': `Bearer ${ token }` }}
      )).data.data;
      console.log(data);
      updateInstance(data);
    } catch (err) {
      console.log(err);
      //if (err.response.status===401 && err.config) {
  
      //}
    }
  };

/*async getInstances() {
    const token = await auth0Client.getIdToken();
    const data = (await axios.get(`http://${ URLS.dataUrl }/getData`,
    { headers: { 'Authorization': `Bearer ${ token }` }}
    )).data;
    console.log(data);*/
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
  /*};

  async addInstance(instance) {
    const token = await auth0Client.getIdToken();*/
    //const owner = instance.owner;
    /*let currentIds = this.state.instances.map(data => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }*/
      /*axios.post(`http://${ URLS.dataUrl }/addInstance`, instance,
        {headers: { 'Authorization': `Bearer ${ token }` }}
      );
  };

  async deleteInstance(owner) {
    const token = await auth0Client.getIdToken();*/
    /*let objOwnerToDelete = null;
    this.state.instances.forEach(ins => {
      if (ins.owner == owner) {
        objOwnerToDelete = ins.owner;
      }
    });*/

    /*axios.delete(`http://${ URLS.dataUrl }/deleteInstance`, {
      data: {
        //owner: objOwnerToDelete
        owner: owner
      },
      headers: { 'Authorization': `Bearer ${ token }` }}
    );
  };*/

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

  render() {
    const { classes, loading } = this.props;
    const { pathname } = this.props.location;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppFrame handleLogOut={this.signOut} pathname={pathname} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {
            !auth0Client.isAuthenticated() && !loading &&
              <React.Fragment>
                <Typography variant="subtitle2" gutterBottom>
                  You must be logged into your chapter's account to continue.
                </Typography>
                <Button variant="contained" color="primary" size="large" className={classes.button} onClick={auth0Client.signIn}>Login</Button>
              </React.Fragment>
            }
            {/*auth0Client.isAuthenticated() &&
              <Dashboard />
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
                {/*<Route exact path='/instance/:instanceId' component={Instance} />
                <SecuredRoute path='/instance:instanceId' component={Instance} />*/}
                <SecuredRoute path='/dashboard' component={Dashboard} />
                <SecuredRoute path='/new-instance' component={NewInstance} onSubmit={this.addInstance} />
                <SecuredRoute path='/board/view-board' component={Board} onSubmit={this.updateInstance} />
                {/*<SecuredRoute path='/email/email-alumni' component={ExternalLinkPanel} />
                <SecuredRoute path='/email/email-donors' component={ExternalLinkPanel} />*/}
                <SecuredRoute path='/email/email-members' component={EmailMembers} />
                {/*<SecuredRoute path='/email/email-sustainers' component={ExternalLinkPanel} />*/}
                <SecuredRoute path='/email/view-stats' component={ViewEmailStats} />
                <SecuredRoute path='/membership/export-alumni' component={ExportAlumni} />
                <SecuredRoute path='/membership/export-donors' component={ExportDonors} />
                <SecuredRoute path='/membership/export-members' component={ExportMembers} />
                <SecuredRoute path='/membership/export-sustainers' component={ExportSustainers} />
                <SecuredRoute path='/membership/view-alumni' component={ViewAlumni} />
                <SecuredRoute path='/membership/view-donors' component={ViewDonors} />
                <SecuredRoute path='/membership/view-members' component={ViewMembers} />
                <SecuredRoute path='/membership/view-sustainers' component={ViewSustainers} />
                <SecuredRoute path='/payments-finances/export-budget' component={ExportBudget} />
                <SecuredRoute path='/payments-finances/export-donations' component={ExportDonations} />
                <SecuredRoute path='/payments-finances/view-budget' component={ViewBudget} />
                <SecuredRoute path='/payments-finances/view-donations' component={ViewDonations} />
                <SecuredRoute path='/social-media/post-to-facebook-page' component={PostToFacebookPage} />
                <SecuredRoute path='/social-media/send-a-tweet' component={SendATweet} />
                <SecuredRoute path='/website' component={Website} onSubmit={this.updateInstance} />
                <SecuredRoute path='/website/edit-posts' component={EditWebsitePosts} />
                <SecuredRoute path='/website/view-posts' component={ViewWebsitePosts} />
                <SecuredRoute path='/website/view-stats' component={ViewWebsiteStats} />
                <SecuredRoute path='/website/write-post' component={WriteWebsitePost} />
                <SecuredRoute path='/get-started/social-media' component={GSSocialMedia} onSubmit={this.updateInstance} />
              </React.Fragment>
            {/*}*/}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  instance: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  setInstance: PropTypes.func.isRequired,
  updateInstance: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  instance: state.instance,
  loading: state.loading,
});

export default withRouter(connect(mapStateToProps, { setInstance, updateInstance })(withStyles(styles, { withTheme: true })(App)));
