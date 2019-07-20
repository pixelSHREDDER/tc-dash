import React from 'react';
//import instance from '../Instance/Instance';
//import SortableTree from 'react-sortable-tree';
//import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
//import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  //FormControlLabel,
  //FormGroup,
  Grid,
  //IconButton,
  //Switch,
  Typography
} from '@material-ui/core';
import { ArrowDownIcon, ExpandMoreIcon } from '../Icons';

const styles = theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(3),
    },
    card: {
      width: 230,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    radioLabel: {
      fontSize: '9px',
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    arrow: {
      textAlign: 'center',
    }
});

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      treeData: [{ title: 'Chicken', children: [{ title: 'Egg' }] }],
    };
  }

  render() {
    const {classes/*, onSubmit*/} = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Chapter Chair
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Ron Swanson
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      chair@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Ron</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                  {/*<div style={{height: 400}}>
                      <SortableTree
                          treeData={this.state.treeData}
                          onChange={treeData => this.setState({treeData})}
                          theme={FileExplorerTheme}
                      />
                  </div>*/}
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={0}>
              <Grid item>
                <ArrowDownIcon />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Vice Chair
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Leslie Knope
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      vicechair@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Leslie</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Vice Chair
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Ann Perkins
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      vicechair@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Ann</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
              <Grid item>
                <ArrowDownIcon />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Finance Director
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Chris Traeger
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      finance@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Chris</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Communications Director
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Ben Wyatt
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      communications@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Ben</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Political Director
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Andy Dwyer
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      politics@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Andy</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Legislative Director
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Tom Haverford
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      legislation@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Tom</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
              <Grid item className={classes.arrow} xs={3}>
                <ArrowDownIcon />
              </Grid>
              <Grid item className={classes.arrow} xs={3}>
              </Grid>
              <Grid item className={classes.arrow} xs={3}>
              </Grid>
              <Grid item className={classes.arrow} xs={3}>
                <ArrowDownIcon />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
              <Grid item xs={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Secretary
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Donna Meagle
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      secretary@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Donna</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
                <br />
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Just The Worst
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Jerry Gurgich
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      murinal@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email Jerry</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={3}>
              </Grid>
              <Grid item xs={3}>
              </Grid>
              <Grid item xs={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      WSDCC Representative
                    </Typography>
                    <Typography variant="h5" component="h2">
                      April Ludgate
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      wsdcc@demochapter.org
                    </Typography>
                    {/*<Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>*/}
                    {/*<FormGroup
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
                      </FormGroup>*/}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button size="small">Email April</Button>
                    <Button size="small"className={classes.expand}>
                      Roles
                      <ExpandMoreIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Board);