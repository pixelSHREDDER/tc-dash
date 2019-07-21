import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Dashboard = ({ instance }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="jumbotron col-12">
          <h1 className="display-3">{instance.title}</h1>
          <p className="lead">{instance.description}</p>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = { instance: PropTypes.object.isRequired };

const mapStateToProps = state => ({ instance: state.instance });

export default withRouter(connect(mapStateToProps, {})(Dashboard));