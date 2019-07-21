import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInstance } from './redux/actions/instanceActions';
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
    this.props.getInstance();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.instance) this.forceUpdate();
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
  getInstance: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  instance: state.instance,
  loading: state.loading,
});

export default withRouter(connect(mapStateToProps, { getInstance })(withStyles(styles, { withTheme: true })(App)));
