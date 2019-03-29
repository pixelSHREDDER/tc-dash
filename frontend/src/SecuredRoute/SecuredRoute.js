import React from 'react';
import {Route} from 'react-router-dom';
import auth0Client from '../Auth';
import CircularProgress from '@material-ui/core/CircularProgress';

function SecuredRoute(props) {
  const {component: Component, path, instance, checkingSession, onSubmit} = props;
  return (
    <Route path={path} render={() => {
        if (checkingSession) return <CircularProgress />;
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div></div>;
        }
        return <Component instance={instance} onSubmit={onSubmit} />
    }} />
  );
}

export default SecuredRoute;