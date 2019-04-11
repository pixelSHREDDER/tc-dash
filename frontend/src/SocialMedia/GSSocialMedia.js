import React, {Component} from 'react';
import RadioToggle from '../RadioToggle/RadioToggle';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from 'mdi-material-ui/ContentSave';
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
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class GSSocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null
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
    const {classes, instance, onSubmit} = this.props;
    if (this.props.instance === null) return <p>Loading ...</p>;
    this.state.instance = this.props.instance;

    return (
        <div style={{height: 400}}>
            <RadioToggle/>
            <Button variant="contained" color="primary" size="large" onClick={() => {this.props.onSubmit(this.state.instance.id, { 'title': this.state.instance.title })}}>
                Save
                <SaveIcon className={classes.rightIcon} />
            </Button>
        </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(GSSocialMedia);