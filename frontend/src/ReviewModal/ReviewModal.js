import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    Modal,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import {
    /*Add as AddIcon,
    ShowChart as AnalyticsIcon,
    AssignmentInd as BoardIcon,
    FormatPaint as BrandingIcon,
    Done as DoneIcon,
    Edit as EditIcon,
    Email as EmailIcon,*/
    ExpandMore as ExpandMoreIcon,
    //SaveAlt as ExportIcon,
    //OpenInNew as ExternalLinkIcon,
    /*Build as GetStartedIcon,
    Help as HelpIcon,
    ListItemIcon,
    Group as MembershipIcon,
    Menu as MenuIcon,
    NewReleases as NewIcon,
    Business as OrganizationInfoIcon,
    AttachMoney as PaymentsIcon,
    TrackChanges as SocialMediaIcon,*/
    //ViewList as ViewListIcon,
    //Web as WebsiteIcon
} from '@material-ui/icons';
import {
    /*CalendarPlus as AddEventIcon,
    FilePlus as AddPostIcon,
    MessagePlus as AddSocialMediaIcon,
    AccountTie as AlumniIcon,*/
    ArrowRight as ArrowRightIcon,
    Palette as BrandingColorsIcon,
    ImageMultiple as BrandingImagesIcon,
    /*Bank as BylawsIcon,
    ClipboardFlow as ChangeBoardIcon,
    LockReset as ChangePasswordIcon,
    Gift as DonationsIcon,
    AccountHeart as DonorIcon,
    CalendarEdit as EditEventsIcon,
    FileDocumentEdit as EditPostsIcon,
    Calendar as EventIcon,
    Facebook as FacebookIcon,
    LockQuestion as ForgotPasswordIcon,
    AlertOctagon as IveBeenHackedIcon,*/
    Rocket as LaunchIcon,
    /*Mailbox as MailingAddressIcon,
    Account as MemberIcon,
    FacebookMessenger as MessengerIcon,
    MessageProcessing as OtherSocialMediaIcon,
    Dialpad as PhoneNumberIcon,
    Podcast as PodcastIcon,
    FileDocument as PostsIcon,
    Headset as StartPodcastIcon,
    AccountConvert as SustainerIcon,*/
    FormatQuoteClose as TaglineDescriptionIcon,
    //Twitter as TwitterIcon,
    //BankTransfer as UpdateBylawsIcon
} from 'mdi-material-ui';

const drawerWidth = 240;

const styles = theme => ({
    expansionPanelSummary: {
        //backgroundColor: deepPurple[500],
        backgroundColor: "#1982d1",
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
        //width: theme.spacing(90),
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
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            expanded: null,
            open: false,
        };
    }

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
        const {classes, isLive} = this.props;
        const {expanded} = this.state;

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