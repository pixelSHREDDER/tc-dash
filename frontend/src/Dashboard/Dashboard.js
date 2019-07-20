import React from 'react';
import { withRouter } from 'react-router-dom';
import instance from '../Instance/Instance';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="jumbotron col-12">
          <h1 className="display-3">{instance.data.title}</h1>
          <p className="lead">{instance.data.description}</p>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Dashboard);