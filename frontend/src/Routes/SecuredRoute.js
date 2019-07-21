import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import auth0Client from '../Auth';
import CircularProgress from '@material-ui/core/CircularProgress';

const SecuredRoute = props => {
  const { component: Component, loading, path, onSubmit } = props;
  return (
    <Route path={path} render={() => {
        if (loading) return <CircularProgress />;
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
  loading: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => ({ loading: state.loading });

export default connect(mapStateToProps, {})(SecuredRoute);
