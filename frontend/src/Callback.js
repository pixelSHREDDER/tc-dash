import React from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from './Auth';
import CircularProgress from '@material-ui/core/CircularProgress';

class Callback extends React.Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    return (
      <CircularProgress />
    );
  }
}

export default withRouter(Callback);