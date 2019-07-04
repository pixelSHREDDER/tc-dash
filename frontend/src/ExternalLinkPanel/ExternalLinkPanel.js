import React from 'react';
import { /*Link,*/ withRouter } from 'react-router-dom';
import DateRange from '../DateRange/DateRange';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import {
    Email as EmailIcon,
    OpenInNew as ExternalLinkIcon
} from '@material-ui/icons';
import {
    GoogleAnalytics as GoogleAnalyticsIcon,
    Facebook as FacebookIcon,
    Google as GoogleIcon,
    Paypal as PayPalIcon,
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

class ExternalLinkPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            instance: null,
            route: null,
            dateString: '',
            links: [''],
        };
        this.setRoutes = this.setRoutes.bind(this);
    };

    async componentDidMount() {
        if (this.props.instance === null) return <p>Loading ...</p>;
        try {
            this.setRoutes(this.props, this.state);
            if (this.state.route === null) return <p>this.state.route === null</p>;
        } catch (err) {
            //if (err.error !== 'login_required') console.log(err.error);
        }
    }

      setRoutes = (props, state) => {
        const { classes, instance } = props;
        const { pathname } = props.location;
        const { dateString } = state;
        let routes = {
            '/email/email-members': [{
                title: 'Email Your Members on Mailchimp',
                text: 'You can view a list of all of your chapter\'s active members via the Wordpress interface.',
                icon: <EmailIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`,
            }],
            '/email/view-stats': [{
                title: 'View Your Email Stats on Mailchimp',
                text: 'You can view your emails\' stats on Mailchimp.',
                note: 'You may be redirected to log into your chapter\'s Mailchimp account first.',
                icon: <GoogleAnalyticsIcon className={classes.icon}/>,
                link: `https://admin.mailchimp.com/reports/`,
            }],
            '/membership/view-members': [{
                title: 'View Your Members on Wordpress',
                text: 'You can view a list of all of your chapter\'s active members via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`,
            }],
            '/membership/export-members': [{
                title: 'Export Your Members from Wordpress',
                text: 'You can export your chapter\'s active member data via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin-ajax.php?action=memberslist_csv&s=&l=1`,
            }],
            '/membership/view-alumni': [{
                title: 'View Your Alumni on Wordpress',
                text: 'You can view a list of all of your chapter\'s alumni via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`,
            }],
            '/membership/export-alumni': [{
                title: 'Export Your Alumni from Wordpress',
                text: 'You can export your chapter\'s alumni data via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`,
            }],
            '/membership/view-donors': [{
                title: 'View Your Donors on Wordpress',
                text: 'You can view a list of all of your chapter\'s donors via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`,
            }],
            '/membership/export-donors': [{
                title: 'Export Your Donors from Wordpress',
                text: 'You can export your chapter\'s donor data via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`,
            }],
            '/membership/view-sustainers': [{
                title: 'View Your Sustainers on Wordpress',
                text: 'You can view a list of all of your chapter\'s sustainers via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`,
            }],
            '/membership/export-sustainers': [{
                title: 'Export Your Sustainers from Wordpress',
                text: 'You can export your chapter\'s sustainer data via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/admin.php?l=1&page=pmpro-memberslist`,
            }],
            '/payments-finances/view-budget': [{
                title: 'View Your Budget on PayPal',
                text: 'You can view all transactions made through your website, as well as any transactions made through PayPal directly.',
                note: 'You may be redirected to log into your position\'s PayPal account first.',
                icon: <PayPalIcon className={classes.icon}/>,
                link: `https://www.paypal.com/listing/transactions?tab=bookkeeping#`,
            }],
            '/payments-finances/export-budget': [{
                title: 'Export Your Budget from PayPal',
                text: 'You can generate and export a report of all transactions made through your website, as well as any transactions made through PayPal directly.',
                note: 'You may be redirected to log into your position\'s PayPal account first.',
                icon: <PayPalIcon className={classes.icon}/>,
                link: `https://www.paypal.com/merchantdata/reportHome?reportType=DLOG${dateString}`,
                dateFormat: 'UTC',
            }],
            '/payments-finances/view-donations': [{
                title: 'View Donations on Wordpress',
                text: 'You can view a list of all of your chapter\'s donations via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/edit.php?post_type=give_forms&page=give-payment-history`,
            }],
            '/payments-finances/export-donations': [{
                title: 'Export All Donations to CSV File',
                text: 'You can export all of your chapter\'s donation data into a CSV (comma-separated values) file.',
                note: 'You may be redirected to log into your Wordpress account first.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&type=export_donations`,
            }, {
                title: 'Export This Year\'s Donations to PDF File',
                text: 'You can export all of your chapter\'s donation data for the current year into a PDF file.',
                note: 'You may be redirected to log into your Wordpress account first.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&give-action=generate_pdf`,
            }],
            '/social-media/post-to-facebook-page': [{
                title: 'Post to Facebook Page',
                text: 'You can post to your chapter\'s Facebook page here.',
                note: 'You may be redirected to log into Facebook first.',
                icon: <FacebookIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/edit.php?post_type=give_forms&page=give-payment-history`,
            }],
            '/website/edit-posts': [{
                title: 'Edit Your Posts on Wordpress',
                text: 'You can edit the posts on your website directly through the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/edit.php`,
            }],
            '/website/view-posts': [{
                title: 'View Your Posts on Wordpress',
                text: 'You can view a list of all the posts on your website via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/category/blog/`,
            }],
            '/website/view-stats': [{
                title: 'View Your Stats on Google Analytics',
                text: 'You can view your website\'s stats and traffic on Google Analytics.',
                note: 'You may be redirected to log into your position\'s Google account first.',
                icon: <GoogleAnalyticsIcon className={classes.icon}/>,
                link: 'https://analytics.google.com/analytics/web/#/report-home/',
            }, {
                title: 'View Your Rankings on Google Search Console',
                text: 'You can view your website\'s search rankings and settings on Google Search Console.',
                note: 'You may be redirected to log into your position\'s Google account first.',
                icon: <GoogleIcon className={classes.icon}/>,
                link: `https://www.google.com/webmasters/tools/googlebot-fetch?hl=en&siteUrl=${instance.domain}/&authuser=0`,
            }],
            '/website/write-post': [{
                title: 'Write a Post on Wordpress',
                text: 'You can write a new post for your website via the Wordpress interface.',
                icon: <WordpressIcon className={classes.icon}/>,
                link: `https://${instance.domain}/wp-admin/post-new.php`,
            }],
        };

        if (routes[pathname]) {
            this.setState({
                route: routes[pathname],
            });
        }
    };

    getDateRange = (data) => {
        let dateString = 'der';
        if ('dateFormat' in this.state.route[0]) dateString = data.from;
        //console.log(data);
        /*let route = this.state.route;
        route[0].link = `${route[0].link}${dateString}`;
        this.setState({ route });*/
        //this.setState({ dateString });
        this.setState({ links: ['der'] });
    };

    render() {
        const {classes/*, instance*/} = this.props;
        const { links } = this.state;
        //if (instance === null) return <p>Loading ...</p>;
        //this.setRoutes(this.props);
        if (this.state.route === null) return <p>this.state.route === null</p>;
        /*this.setState({
            instance: instance,
        });*/

        return (
            <Grid container className={classes.root} spacing={2} justify="center">
                {this.state.route.map((item, index) => (
                    <Grid item md={8} key={`panel-${index}`}>
                        <Paper className={classes.paper} elevation={1}>
                            {item.icon}
                            <Typography component="p" gutterBottom>
                            {item.text} Just follow the link below:
                            </Typography>
                            {
                            item.note &&
                                <Typography component="p" gutterBottom>
                                    NOTE: {item.note}
                                </Typography>
                            }
                            <br />
                            {
                            item.dateFormat &&
                                <Grid container justify="center" spacing={2}>
                                    <Grid item md={4}>
                                        {this.state.dateString}
                                        <DateRange sendDateRange={this.getDateRange} />
                                    </Grid>
                                    <Grid item md={8}>
                                        <a href={links[index]} target="_blank" rel="noopener noreferrer">
                                            <Button size="large" color="primary" autoFocus>
                                                {item.title}
                                                <ExternalLinkIcon className={classes.rightIcon} />
                                            </Button>
                                        </a>
                                    </Grid>
                                </Grid>
                            }
                            {
                            !item.dateFormat &&
                                <a href={links[index]} target="_blank" rel="noopener noreferrer">
                                    <Button size="large" color="primary" autoFocus>
                                        {item.title}
                                        <ExternalLinkIcon className={classes.rightIcon} />
                                    </Button>
                                </a>
                            }
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        )
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(ExternalLinkPanel));