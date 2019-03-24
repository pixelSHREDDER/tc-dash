import React, { Component } from 'react';
//import {Route, withRouter} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import auth0Client from './Auth';
/*import Callback from './Callback';
import NewInstance from './NewInstance/NewInstance';
import SecuredRoute from './SecuredRoute/SecuredRoute';*/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import AppBar from './ButtonAppBar/ButtonAppBar';
/*import RadioToggle from './RadioToggle/RadioToggle';
import Instance from './Instance/Instance';
import Instances from './Instances/Instances';*/


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
    error: red
  },
  typography: {
    useNextVariants: true,
  },
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
