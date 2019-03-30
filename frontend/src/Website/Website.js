import React, {Component} from 'react';
//import axios from 'axios';
//import auth0Client from '../Auth';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
  });

class Website extends Component {
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
    const instance = (await axios.get(`http://localhost:8081/${params.instanceId}`, {
        instance,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    })).data;
    this.setState({
        instance,
    });
  }*/

  /*async submitAnswer(answer) {
    await axios.post(`http://localhost:8081/answer/${this.state.instance.id}`, {
      answer,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });
    await this.refreshInstance();
  }*/

  render() {
    const {instance, onSubmit} = this.props;
    if (this.props.instance === null) return <p>Loading ...</p>;
    this.state.instance = this.props.instance;
    this.state.instance.title = "flerp";
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{this.state.instance.title}</h1>
            <p className="lead">{this.state.instance.description}</p>
            <hr className="my-4" />
            <Button onClick={() => {this.props.onSubmit(this.state.instance.id, { 'title': this.state.instance.title })}}>Do</Button>
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

export default withStyles(styles, { withTheme: true })(Website);