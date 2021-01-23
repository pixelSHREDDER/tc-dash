import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from '@material-ui/core/CircularProgress';

const SecuredRoute = props => {
  const { component: Component, path, onSubmit } = props;
  const { isAuthenticated } = useAuth0();
  const isLoading = useSelector(state => state.isLoading);

  return (
    <Route path={path} render={() => {
        if (isLoading) return <CircularProgress />;
        if (!isAuthenticated) return;
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
