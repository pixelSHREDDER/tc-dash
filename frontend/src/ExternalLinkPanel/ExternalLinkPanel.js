import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DateRange from '../DateRange/DateRange';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import { ExternalLinkIcon } from '../Icons';

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
    constructor(props) {
        super(props);
        this.state = {
            panels: this.props.panels,
        };
    };

    async componentDidMount() {
        let panels = this.state.panels;

        for (let i = 0; i < panels.length; i++) {
            if ('useDates' in panels[i]) panels[i] = {...panels[i], from: null, to: null}
        }

        this.setState({panels});
    }

    setDates = (index, dates) => {
        let panels = this.state.panels;
        panels[index].from = dates.from;
        panels[index].to = dates.to;

        this.setState({panels});
    }

    render() {
        const { classes, domain } = this.props;
        const { panels } = this.state;

        return (
            <Grid container className={classes.root} spacing={2} justify="center">
                {panels.map((panel, index) => (
                    <Grid item md={8} key={`panel-${index}`}>
                        <Paper className={classes.paper} elevation={1}>
                            {
                                React.cloneElement(
                                    panel.icon,
                                    {className: classes.icon}
                                )
                            }
                            <Typography component="p" gutterBottom>
                            {panel.text} Just follow the link below:
                            </Typography>
                            {
                            panel.note &&
                                <Typography component="p" gutterBottom>
                                    NOTE: {panel.note}
                                </Typography>
                            }
                            <br />
                            {
                            panel.useDates &&
                                <Grid container justify="center" spacing={2}>
                                    <Grid item md={4}>
                                        {/* TODO: Fix infinite loop */} 
                                        {/*<DateRange sendDateRange={(data) => this.setDates(index, data)} />*/}
                                    </Grid>
                                    <Grid item md={8}>
                                        <Button onClick={() => {panel.linkFn(domain, panel.from, panel.to)}} size="large" color="primary" autoFocus>
                                            {panel.title}
                                            <ExternalLinkIcon className={classes.rightIcon} />
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                            {
                            !panel.useDates &&
                                <Button onClick={() => {panel.linkFn(domain)}} size="large" color="primary" autoFocus>
                                    {panel.title}
                                    <ExternalLinkIcon className={classes.rightIcon} />
                                </Button>
                            }
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        )
    }
}

ExternalLinkPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    domain: PropTypes.string.isRequired,
    panels: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({ domain: state.instance.domain });

export default withRouter(connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ExternalLinkPanel)));