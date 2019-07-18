import React from 'react';
import { withRouter } from 'react-router-dom';

const Dashboard = ({instance}) => {
  if (instance === null) return <p>Loading ...</p>;

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

export default withRouter(Dashboard);