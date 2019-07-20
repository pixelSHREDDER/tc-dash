import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import auth0Client from '../Auth';
import CircularProgress from '@material-ui/core/CircularProgress';

const SecuredRoute = props => {
  const { component: Component, path, onSubmit } = props;
  return (
    <Route path={path} render={() => {
        if (auth0Client.getCheckingSession()) return <CircularProgress />;
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div></div>;
        }
        return <Component onSubmit={onSubmit} />
    }} />
  );
};

SecuredRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  path: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

export default SecuredRoute;