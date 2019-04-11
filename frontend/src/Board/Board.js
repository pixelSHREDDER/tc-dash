import React, {Component} from 'react';
//import SortableTree from 'react-sortable-tree';
//import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
//import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography
} from '@material-ui/core';

const styles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
    formControl: {
      margin: theme.spacing.unit * 3,
    },
    card: {
      width: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    radioLabel: {
      fontSize: '9px',
    }
});

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
      treeData: [{ title: 'Chicken', children: [{ title: 'Egg' }] }],
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
    if (this.props.instance === null) return <CircularProgress />;
    this.state.instance = this.props.instance;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Western Regional Director
            </Typography>
            <Typography variant="h5" component="h2">
              Ron Swanson
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              westerndirector@demochapter.org
            </Typography>
            {/*<Typography component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>*/}
            <FormGroup
              aria-label="GenFacebookder"
              name="facebook"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                className={classes.radioLabel}
                value="true"
                control={
                  <Switch
                    color="primary"
                    checked={this.state.value}
                    onChange={this.handleChange}
                    value="value"
                  />
                }
                label="This position manages finances"
              />
              <FormControlLabel
                className={classes.radioLabel}
                value="false"
                control={
                  <Switch
                    color="primary"
                    checked={this.state.value}
                    onChange={this.handleChange}
                    value="value"
                  />
                }
                label="This position manages communications"
              />
            </FormGroup>
          </CardContent>
          <CardActions>
            <Button size="small">Email Ron</Button>
          </CardActions>
          {/*<div style={{height: 400}}>
              <SortableTree
                  treeData={this.state.treeData}
                  onChange={treeData => this.setState({treeData})}
                  theme={FileExplorerTheme}
              />
          </div>*/}
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Eastern Regional Director
            </Typography>
            <Typography variant="h5" component="h2">
              Leslie Knope
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              easterndirector@demochapter.org
            </Typography>
            {/*<Typography component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>*/}
            <FormGroup
              aria-label="GenFacebookder"
              name="facebook"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                className={classes.radioLabel}
                value="true"
                control={
                  <Switch
                    color="primary"
                    checked={this.state.value}
                    onChange={this.handleChange}
                    value="value"
                  />
                }
                label="This position manages finances"
              />
              <FormControlLabel
                className={classes.radioLabel}
                value="false"
                control={
                  <Switch
                    color="primary"
                    checked={this.state.value}
                    onChange={this.handleChange}
                    value="value"
                  />
                }
                label="This position manages communications"
              />
            </FormGroup>
          </CardContent>
          <CardActions>
            <Button size="small">Email Ron</Button>
          </CardActions>
          {/*<div style={{height: 400}}>
              <SortableTree
                  treeData={this.state.treeData}
                  onChange={treeData => this.setState({treeData})}
                  theme={FileExplorerTheme}
              />
          </div>*/}
        </Card>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Board);