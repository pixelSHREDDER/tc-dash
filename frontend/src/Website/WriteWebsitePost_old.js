import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import auth0Client from '../Auth';
import ExternalLinkPanel from '../ExternalLinkPanel/ExternalLinkPanel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  });

class WebsiteWritePost extends React.Component {
  constructor() {
    super();
    this.state = {
      //instance: null,
    };

    //his.submitAnswer = this.submitAnswer.bind(this);
  }

  /*async componentDidMount() {
    await this.refreshInstance();
  }

  async refreshInstance() {
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
  }*/

  render() {
    const {instance} = this.props;
    if (this.props.instance === null) return <p>Loading ...</p>;
    //this.state.instance = this.props.instance;

    return (
      <div className="container">
      <ExternalLinkPanel instance={instance} />
        {/*<div className="row">
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
          </div>*/}
      </div>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(WebsiteWritePost));