import React, {Component} from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';

class Instance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    const instance = (await axios.get(`http://localhost:8081/${params.instanceId}`)).data;
    this.setState({
        instance,
    });
  }

  async submitAnswer(answer) {
    await axios.post(`http://localhost:8081/answer/${this.state.instance.id}`, {
      answer,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshQuestion();
  }

  render() {
    const {instance} = this.state;
    if (instance === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{instance.title}</h1>
            <p className="lead">{instance.description}</p>
            <hr className="my-4" />
            <SubmitAnswer instanceId={instance.id} submitAnswer={this.submitAnswer} />
            <p>Answers:</p>
            {
              instance.answers.map((answer, idx) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Instance;