import React from 'react';
//import instance from '../Instance/Instance';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
//import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
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
import {
  ArrowDownIcon,
  ExpandMoreIcon,
  //InfoIcon
  //MoreVertIcon
} from '../Icons';

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
    /*iconButton: {
      marginTop: 0,
    },*/
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
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        {
          title: 'President',
          subtitle: 'Spencer Lively',
          children: [
            {
              title: 'Executive Vice President',
              subtitle: 'LaKecia Farmer',
              children: [
                {
                  title: 'Vice President of Operations',
                  subtitle: 'Mike DeVine',
                  children: [
                    {
                      title: 'Development Director',
                      subtitle: 'Eric Fejeran',
                    },
                    {
                      title: 'Finance Director',
                      subtitle: 'Sam Akeyo',
                    },
                  ],
                },
                {
                  title: 'Vice President of Membership',
                  subtitle: 'Kurt Price',
                  children: [
                    {
                      title: 'Director of Eastern Washington',
                      subtitle: 'Alex Knox',
                    },
                    {
                      title: 'Director of Southern Washington',
                      subtitle: 'Karina Solorio',
                    },
                    {
                      title: 'Director of Western Washington',
                      subtitle: 'Bennett Massey-Helber',
                    },
                  ],
                },
                {
                  title: 'Vice President of Government',
                  subtitle: 'Matthew Lang',
                  children: [
                    {
                      title: 'Advocacy Director',
                      subtitle: 'Camille Hatwig',
                    },
                    {
                      title: 'Current Affairs Director',
                      subtitle: 'Kaitlyn Davidson',
                    },
                  ],
                },
                {
                  title: 'Vice President of Communications',
                  subtitle: 'Hannah Oliver',
                  children: [
                    {
                      title: 'Digital Media Director',
                      subtitle: 'Breyanna Ashley-White',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      menuOptions: [
        {
          title: 'More Info',
          onClick: () => {console.log('der')},
        },
        {
          title: 'Reassign',
          onClick: () => {console.log('der')},
        },
        {
          title: 'View/Edit Roles',
          onClick: () => {console.log('der')},
        },
        {
          title: 'Vacate Position',
          onClick: () => {console.log('der')},
        },
        {
          title: <span style={{color: 'red'}}>Remove Position</span>,
          onClick: () => {console.log('her')},
        },
      ],
    };
    this.updateTreeData = this.updateTreeData.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  componentDidMount() {
    this.expandAll();
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  expand(expanded) {
    this.setState({
      treeData: toggleExpandedForAll({
        treeData: this.state.treeData,
        expanded,
      }),
    });
  }

  expandAll() {
    this.expand(true);
  }

  collapseAll() {
    this.expand(false);
  }

  render() {
    const {classes/*, onSubmit*/} = this.props;
    const {
      treeData,
      menuOptions,
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state;

    const alertNodeInfo = ({ node, path, treeIndex }) => {
      const objectString = Object.keys(node)
        .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
        .join(',\n   ');

      global.alert(
        'Info passed to the icon and button generators:\n\n' +
          `node: {\n   ${objectString}\n},\n` +
          `path: [${path.join(', ')}],\n` +
          `treeIndex: ${treeIndex}`
      );
    };

    /*const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });*/


    return (
      <React.Fragment>
        {/*<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
            <h3>Full Node Drag Theme</h3>
            <button onClick={this.expandAll}>Expand All</button>
            <button onClick={this.collapseAll}>Collapse All</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <form
              style={{ display: 'inline-block' }}
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              <label htmlFor="find-box">
                Search:&nbsp;
                <input
                  id="find-box"
                  type="text"
                  value={searchString}
                  onChange={event =>
                    this.setState({ searchString: event.target.value })
                  }
                />
              </label>

              <button
                type="button"
                disabled={!searchFoundCount}
                onClick={selectPrevMatch}
              >
                &lt;
              </button>

              <button
                type="submit"
                disabled={!searchFoundCount}
                onClick={selectNextMatch}
              >
                &gt;
              </button>

              <span>
                &nbsp;
                {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
                &nbsp;/&nbsp;
                {searchFoundCount || 0}
              </span>
            </form>
          </div>
          <div style={{ flex: '1 0 50%', padding: '0 0 0 15px' }}>*/}
          <div style={{ height: 400 }}>
            <SortableTree
              theme={FileExplorerTheme}
              treeData={treeData}
              onChange={this.updateTreeData}
              /*searchQuery={searchString}
              searchFocusOffset={searchFocusIndex}
              searchFinishCallback={matches =>
                this.setState({
                  searchFoundCount: matches.length,
                  searchFocusIndex:
                    matches.length > 0 ? searchFocusIndex % matches.length : 0,
                })
              }*/
              //canDrag={({ node }) => !node.dragDisabled}
              canDrag={() => false}
              generateNodeProps={rowInfo => ({
                menuOptions: menuOptions,
                /*buttons: [
                  <IconButton
                    aria-label="Info"
                    //className={classes.iconButton}
                    onClick={() => alertNodeInfo(rowInfo)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  //<button onClick={() => alertNodeInfo(rowInfo)}>i</button>,
                ],*/
              })}
            />
          </div>
        {/*</div>*/}
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