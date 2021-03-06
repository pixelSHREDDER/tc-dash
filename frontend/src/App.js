import React, { /*useState, */ useEffect, useRef } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
/*import axios from 'axios';
import { addError } from './redux/actions/errorActions';
import { setInstance, updateInstance } from './redux/actions/instanceActions';*/
import { setIsLoading } from './redux/actions/isLoadingActions';
/*import config, { URLS } from './conf';
import auth0Client from './Auth';*/
//import Callback from './Callback';
import { useInstance } from './CustomHooks';
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
import GSAnalyticsSEO from './GetStarted/GSAnalyticsSEO';
import GSBoard from './GetStarted/GSBoard';
import GSBrandingPersonalization from './GetStarted/GSBrandingPersonalization';
import GSBylawsConstitution from './GetStarted/GSBylawsConstitution';
import GSEmail from './GetStarted/GSEmail';
import GSOrganizationInfo from './GetStarted/GSOrganizationInfo';
import GSPaymentsFinances from './GetStarted/GSPaymentsFinances';
import GSPodcasting from './GetStarted/GSPodcasting';
import GSSocialMedia from './GetStarted/GSSocialMedia';
import GSWebsite from './GetStarted/GSWebsite';
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

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, green, red } from '@material-ui/core/colors';
import {
  Button,
  CircularProgress,
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

/*const updateCurrentInstance = async (update, updateInstance, id) => {
  //const { updateInstance } = this.props;
  let token = null;
  let data = {};
  
  try {
    token = await auth0Client.getIdToken();
    data = (await axios.post(`http://${ URLS.dataUrl }/updateInstance/${ id }`,
      { data: update },
      { headers: { 'Authorization': `Bearer ${ token }` }}
    )).data.data;
    updateInstance(data);
  } catch (err) {
    console.log(err);
    //if (err.response.status===401 && err.config) {

    //}
  }
};

async getInstances() {
  const token = await auth0Client.getIdToken();
  const data = (await axios.get(`http://${ URLS.dataUrl }/getData`,
  { headers: { 'Authorization': `Bearer ${ token }` }}
  )).data;*/
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

/*const Instance = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: config.AUTH0.audience,
          scope: 'read:current_user',
        });
        const response = await fetch(`http://${URLS.dataUrl}/instance/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInstance(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);
console.log(instance);
  if (!instance) {
    return <div>Loading...</div>;
  }

  return <div>done</div>;
};*/

const signOut = (history, logout, options) => {
  logout(options);
  history.replace('/');
};

function App(props) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { classes, history, location } = props;
  const { handleGetInstance } = useInstance();
  const instanceGot = useRef(null);
  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();
  const updateCurrentInstance = () => {};

  useEffect(() => {
    if ((location.pathname === 'callback') || !isAuthenticated || instanceGot.current) return;

    handleGetInstance(() => {
      instanceGot.current = true;
      dispatch(setIsLoading(false));
    });
  }, [dispatch, handleGetInstance, instanceGot, isAuthenticated, location]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppFrame handleLogOut={() => signOut(history, logout, { returnTo: window.location.origin })} pathname={location.pathname} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          { !isAuthenticated && !isLoading &&
            <React.Fragment>
              <Typography variant="subtitle2" gutterBottom>
                You must be logged into your chapter's account to continue.
              </Typography>
              <Button variant="contained" color="primary" size="large" className={classes.button} onClick={() => loginWithRedirect()}>Login</Button>
            </React.Fragment>
          }
          {/*isAuthenticated &&
            <Dashboard />
          */}
            <React.Fragment>
              <Route path="/callback" render={ (props) => {
                //checkAuthentication(props);
                return (<Callback />);
              }} />
              {/*<Route exact path='/instance/:instanceId' component={Instance} />
              <SecuredRoute path='/instance:instanceId' component={Instance} />*/}
              <SecuredRoute path='/dashboard' component={Dashboard} />
              {/*<SecuredRoute path='/new-instance' component={NewInstance} onSubmit={addInstance} />*/}
              <SecuredRoute path='/new-instance' component={NewInstance} onSubmit={()=>{}} />
              <SecuredRoute path='/board/view-board' component={Board} onSubmit={updateCurrentInstance} />
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
              <SecuredRoute path='/website' component={Website} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/website/edit-posts' component={EditWebsitePosts} />
              <SecuredRoute path='/website/view-posts' component={ViewWebsitePosts} />
              <SecuredRoute path='/website/view-stats' component={ViewWebsiteStats} />
              <SecuredRoute path='/website/write-post' component={WriteWebsitePost} />
              <SecuredRoute path='/get-started/analytics-seo' component={GSAnalyticsSEO} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/board' component={GSBoard} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/branding-personalization' component={GSBrandingPersonalization} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/bylaws-constitution' component={GSBylawsConstitution} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/email' component={GSEmail} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/organization-info' component={GSOrganizationInfo} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/payments-finances' component={GSPaymentsFinances} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/podcasting' component={GSPodcasting} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/social-media' component={GSSocialMedia} onSubmit={updateCurrentInstance} />
              <SecuredRoute path='/get-started/website' component={GSWebsite} onSubmit={updateCurrentInstance} />
            </React.Fragment>
          {/*}*/}
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default withRouter(withStyles(styles, { withTheme: true })(App));