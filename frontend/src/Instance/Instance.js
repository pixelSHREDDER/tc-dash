import React from 'react';
//import axios from 'axios';
//import { URLS } from '../conf';
//import SubmitAnswer from './SubmitAnswer';
//import auth0Client from '../Auth';

class Instance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
    };

    //this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    //await this.refreshInstance();
  }

  /*async refreshInstance() {
    const { match: { params } } = this.props;
    try {
      const token = await auth0Client.getIdToken();
      const instance = (await axios.get(`http://${ URLS.dataUrl }/${ params.instanceId }`, {
        headers: { 'Authorization': `Bearer ${ token }` }
      })).data;
      this.setState({
          instance,
      });
    } catch (err) {
      if (err.response.status===401 && err.config) {

      }
    }
  }*/

  /*async submitAnswer(answer) {
    await axios.post(`http://${ URLS.dataUrl }/answer/${ this.state.instance.id }`, {
      answer,
    }, {
      headers: { 'Authorization': `Bearer ${ auth0Client.getIdToken() }` }
    });
    await this.refreshInstance();
  }*/

  render() {
    const {instance} = this.props;
    //const {instance} = this.state;
    if (instance === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{instance.title}</h1>
            <p className="lead">{instance.description}</p>
            <hr className="my-4" />
            {/*<SubmitAnswer instanceId={instance.id} submitAnswer={this.submitAnswer} />
            <p>Answers:</p>
            {
              instance.answers.map((answer, idx) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Instance;