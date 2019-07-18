import React from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from './Auth';
import CircularProgress from '@material-ui/core/CircularProgress';

const Callback = () => {
    async componentDidMount = () => {
      await auth0Client.handleAuthentication();
      this.props.history.replace('/');
    };

    return (
      <CircularProgress />
    );
};

export default withRouter(Callback);