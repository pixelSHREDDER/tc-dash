import React from 'react';
import PropTypes from 'prop-types';
import { isLive } from '../Instance/Instance';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    //DialogContentText,
    DialogTitle,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    //ListItemIcon,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import {
    /*AddEventIcon,
    AddIcon,
    AddPostIcon,
    AddSocialMediaIcon,
    AlumniIcon,
    AnalyticsIcon,*/
    ArrowRightIcon,
    //BoardIcon,
    BrandingColorsIcon,
    //BrandingIcon,
    BrandingImagesIcon,
    /*BylawsIcon,
    ChangeBoardIcon,
    ChangePasswordIcon,
    DonationsIcon,
    DoneIcon,
    DonorIcon,
    EditEventsIcon,
    EditIcon,
    EditPostsIcon,
    EmailIcon,
    EventIcon,*/
    ExpandMoreIcon,
    /*ExportIcon,
    ExternalLinkIcon,
    FacebookIcon,
    ForgotPasswordIcon,
    GetStartedIcon,
    HelpIcon,
    IveBeenHackedIcon,*/
    LaunchIcon,
    /*MailingAddressIcon,
    MemberIcon,
    MembershipIcon,
    MenuIcon,
    MessengerIcon,
    NewIcon,
    OrganizationInfoIcon,
    OtherSocialMediaIcon,
    PaymentsIcon,
    PhoneNumberIcon,
    PodcastIcon,
    PostsIcon,
    SocialMediaIcon,
    StartPodcastIcon,
    SustainerIcon,*/
    TaglineDescriptionIcon
    /*TwitterIcon,
    UpdateBylawsIcon,
    ViewListIcon,
    WebsiteIcon*/
} from '../Icons';

const drawerWidth = 240;

const styles = theme => ({
    expansionPanelSummary: {
        backgroundColor: deepPurple[500],
      },
    expansionHeading: {
        //fontSize: theme.typography.pxToRem(15),
        fontWeight: 500,
        flexBasis: '50%',
        flexShrink: 0,
        color: theme.palette.common.white,
    },
    expansionSecondaryHeading: {
        //fontSize: theme.typography.pxToRem(15),
        color: theme.palette.common.white,
        //color: theme.palette.text.secondary,
    },
    expansionIcon: {
        color: theme.palette.common.white,
    },
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
    modal: {
        position: 'absolute',
        top: '10%',
        left: '50%',
        width: '50%',
        height: '90%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
        transform: 'translate(-50%, -5%)',
    },
    buttons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        padding: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    },
    drawerButton: {
        width: drawerWidth - (theme.spacing(6)),
    },
    icon: {
        marginLeft: theme.spacing(1),
    },
});

class ReviewModal extends React.Component {
    state = {
        dialogOpen: false,
        expanded: null,
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleClickItem = () => (item) => {
        this.setState({ dialogOpen: true });
    };

    handleDeleteItem = () => (item) => {
        alert('You clicked the delete icon.');
    };

    handleExpansionChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <React.Fragment>
                <Button variant="contained" color="secondary" size="large" className={classes.drawerButton} onClick={this.handleOpen}>
                    {isLive ? 'Submit!' : 'Launch!'}
                    <LaunchIcon className={classes.icon} />
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={classes.modal}>
                        <Typography variant="h6" id="modal-title">
                            Let's review your {isLive ? 'changes' : 'choices'}
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Click/tap on an item for details.
                        </Typography>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleExpansionChange('panel1')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expansionIcon} />} className={classes.expansionPanelSummary}>
                                <Typography className={classes.expansionHeading}>Organization Info</Typography>
                                <Typography className={classes.expansionSecondaryHeading}>1 change</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className={classes.chips}>
                                    <Chip
                                        icon={<TaglineDescriptionIcon />}
                                        label="Tagline changed"
                                        onClick={this.handleClickItem('der')}
                                        onDelete={this.handleDeleteItem('der')}
                                        className={classes.chip}
                                    />
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleExpansionChange('panel2')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expansionIcon}  />} className={classes.expansionPanelSummary}>
                                <Typography className={classes.expansionHeading}>Branding & Personalization</Typography>
                                <Typography className={classes.expansionSecondaryHeading}>3 changes</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className={classes.chips}>
                                    <Chip
                                        icon={<BrandingColorsIcon />}
                                        label="Change branding colors"
                                        onClick={this.handleClickItem('der')}
                                        onDelete={this.handleDeleteItem('der')}
                                        className={classes.chip}
                                    />
                                    <Chip
                                        icon={<BrandingImagesIcon />}
                                        label="Replace logo image"
                                        onClick={this.handleClickItem('der')}
                                        onDelete={this.handleDeleteItem('der')}
                                        className={classes.chip}
                                    />
                                    <Chip
                                        icon={<BrandingImagesIcon />}
                                        label="Replace header image"
                                        onClick={this.handleClickItem('der')}
                                        onDelete={this.handleDeleteItem('der')}
                                        className={classes.chip}
                                    />
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <div className={classes.buttons}>
                            <Button variant="contained" color="secondary" size="large" className={classes.button} onClick={this.handleClose}>
                                {isLive ? 'Looks Good!' : 'Ready for Launch!'}
                                <LaunchIcon className={classes.icon} />
                            </Button>
                            <Button size="large" className={classes.button} onClick={this.handleClose}>
                                Go Back
                            </Button>
                        </div>
                        <Dialog
                            open={this.state.dialogOpen}
                            onClose={this.handleDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            >
                            <DialogTitle id="alert-dialog-title">{"Review change"}</DialogTitle>
                            <DialogContent>
                                {/*<DialogContentText id="alert-dialog-description">
                                    Let Google help apps determine location. This means sending anonymous location data to
                                    Google, even when no apps are running.
                                </DialogContentText>*/}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Old</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>New</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Herp
                                            </TableCell>
                                            <TableCell><ArrowRightIcon /></TableCell>
                                            <TableCell>
                                                Derp
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleDialogClose} color="primary">
                                    Discard
                                </Button>
                                <Button onClick={this.handleDialogClose} color="primary" autoFocus>
                                    Keep
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

ReviewModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ReviewModal);