import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import {
    Wordpress as WordpressIcon
} from 'mdi-material-ui';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    icon: {
        color: theme.palette.primary.main,
        fontSize: '4.0rem',
        marginBottom: theme.spacing(2),
    },
    rightIcon: {
        fontSize: '0.75rem',
    },
  });

class ExportDonations extends React.Component {
  constructor() {
    super();
    this.state = {
        instance: null,
    };
  }

  render() {
    const {classes, instance} = this.props;
    const {pathname} = this.props.location;
    if ((this.props.instance === null) || !(pathname in this.state.routes)) return <p>Loading ...</p>;
    /*this.setState({
        instance: this.props.instance,
    });*/

    return (
        <Grid container className={classes.root} spacing={16} justify="center">
            <Grid item md={8}>
                <Paper className={classes.paper} elevation={1}>
                    <WordpressIcon className={this.props.classes.icon}/>
                    <Typography component="p" gutterBottom>
                    You can export all of your chapter's donation data into a CSV (comma-separated values) file. Just follow the link below:
                    </Typography>
                    <Typography component="p" gutterBottom>
                        NOTE: You may be redirected to log into your Wordpress account first.
                    </Typography>
                    <br />
                    <a href={`https://${this.props.instance.domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&type=export_donations`} target="_blank" rel="noopener noreferrer">
                        <Button size="large" color="primary" autoFocus>
                            Export All Donations to CSV File
                            <ExternalLinkIcon className={classes.rightIcon} />
                        </Button>
                    </a>
                </Paper>
            </Grid>
        </Grid>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(ExportDonations));