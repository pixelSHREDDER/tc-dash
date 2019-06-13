import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Instances extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instances: null,
    };
  }

  async componentDidMount() {
    const instances = (await axios.get('http://localhost:8081/')).data;
    this.setState({
        instances,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <Link to="/new-instance">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {this.state.instances === null && <p>Loading instances...</p>}
          {
            this.state.instances && this.state.instances.map(instance => (
              <div key={instance.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/instance/${instance.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Answers: {instance.answers}</div>
                    <div className="card-body">
                      <h4 className="card-title">{instance.title}</h4>
                      <p className="card-text">{instance.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Instances;