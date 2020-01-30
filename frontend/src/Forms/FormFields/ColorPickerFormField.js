import React from 'react';
import PropTypes from 'prop-types';
//import AcceptedFiles from '../AcceptedFiles';
//import FileUploadFormField from './FileUploadFormField';
import { CloseIcon } from '../../Icons';
//import AvatarEditor from 'react-avatar-editor'
import ColorPicker from 'material-ui-color-picker';
//import { withStyles } from '@material-ui/core/styles';
import {
    makeStyles,
    withStyles
} from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    CardMedia,
    CircularProgress,
    Dialog,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    //Input,
    //InputLabel,
    Slide,
    Slider,
    Toolbar,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
//const styles = theme => ({
    legend: {
        marginBottom: theme => theme.spacing(1),
    },
    cardMedia: {
        height: 140,
        backgroundColor: props => props.color ? props.color : '#FFFFFF',
        backgroundSize: 'contain',
        marginBottom: theme => theme.spacing(1),
    },
    cardButton: {
        width: '100%',
    },
    formHelperText: {
        marginBottom: theme => theme.spacing(1),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme => theme.spacing(2),
        flex: 1,
    },
    modal: {
        flexGrow: 1,
        padding: theme => `0 ${theme.spacing(2)}px`,
    },
    /*avatarEditor: {
        display: 'block',
        backgroundColor: '#000000',
        border: 'medium solid #C8C8C8',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(2),
        },
    },
    avatarEditorOpaque: {
        backgroundColor: '#000000',
    },
    avatarEditorTransparent: {
        backgroundColor: 'transparent',
    },*/
    slider: {
        padding: theme => theme.spacing(1),
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

/*const imageEditorOptions = {
    includeUI: {
        menu: ['crop', 'flip', 'rotate'],
        initMenu: 'crop',
        menuBarPosition: 'bottom',
    },
};*/

class ColorPickerFormField extends React.Component {
    constructor() {
        super();
        this.state = {
            //acceptedFiles: new AcceptedFiles(),
            dialogOpen: null,
            field: null,
            //fileUploadFields: [{}],
            //img: null,
            color: null,
            loading: true,
            //rotate: 0.0,
            //scale: 1.0,
        };
    };
    //editorRef = React.createRef();

    async componentDidMount() {
        const { fields, index } = this.props;
        //const { acceptedFiles } = this.state;
        let newField = fields[index];
        //let newFileUploadFields = [];

        if (!('label' in newField)) { newField.label = 'Pick a Color'; }
        if (!('id' in newField)) { newField.id = newField.label.replace(/ /g, '_'); }
        //if (!('imgWidth' in newField)) { newField.imgWidth = 500; }
        //if (!('imgHeight' in newField)) { newField.imgHeight = 500; }
        //if (!('fileType' in newField)) { newField.fileType = 'images'; }

        //newField.acceptedFiles = acceptedFiles[newField.fileType];

        newField.description = ('description' in newField && newField.description.length)
        ? `${newField.description} You can either select a color manually, or upload an image to extract a color from.`
        : 'You can either select a color manually, or upload an image to extract a color from.';

        /*newFileUploadFields.push({
            id: `${newField.id}_file_upload`,
            fileType: newField.fileType,
            filesLimit: 1,
            showPreviews: false,
            extraAttrs: {
                onDrop: this.handleFileDrop,
            },
        });*/

        this.setState({
            field: newField,
            //fileUploadFields: newFileUploadFields,
            loading: false,
        });
    }

    handleClickOpen = type => this.setState({ dialogOpen: type });
    handleClose = type => this.setState({ dialogOpen: type });

    handleColorChange = data => {
        const { classes } = this.props;
        if (!data) return;
        //TODO: Add validation
        console.log(data);
        //classes.cardMedia.backgroundColor = data.toString();
        this.setState({ color: data });
    }

    /*handleFileDrop = data => {
        //const { fields, index } = this.props;
        // TODO: add validation/size checking logic here
        console.log(data);
        this.setState({ color: data });
    }*/

    render() {
        const { classes, fields, index, form, errors } = this.props;
        const { color, dialogOpen, field, /*fileUploadFields, img,*/ loading/*, rotate, scale*/ } = this.state;
        //const classes = useStyles(this.props);

        if (loading) { return <CircularProgress />; }

        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                    <FormLabel component="legend" className={classes.legend}>{field.label}</FormLabel>
                    {/* TODO: Tie in label switching if img exists, to button and cardmedia image, set default image and use img url */}
                    <CardMedia className={classes.cardMedia} title={field.label} children={null} background-color={color ? color : '#FFFFFF'} />
                    <Grid container justify="center" spacing={1}>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Button className={classes.cardButton} variant="outlined" color="primary" onClick={() => this.handleClickOpen('image')}>Get From Image</Button>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Button className={classes.cardButton} variant="outlined" color="primary" onClick={() => this.handleClickOpen('manual')}>Set Manually</Button>
                        </Grid>
                    </Grid>
                    <FormHelperText>{field.description}</FormHelperText>
                    <FormHelperText id={`${field.id}-helper-text`} className={(index === (fields.length - 1)) ? classes.formHelperText : ''}>
                        {(field.id in errors) && <span>{errors[field.id]}</span>}
                    </FormHelperText>
                </FormControl>
                <Dialog
                    fullScreen
                    open={dialogOpen === 'image'}
                    onClose={() => this.handleClose()}
                    TransitionComponent={Transition}
                    disableEnforceFocus
                >
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => this.handleClose()} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>{field.label}: Get From Image</Typography>
                        <Button autoFocus color="inherit" onClick={() => this.handleClose()}>Save</Button>
                    </Toolbar>
                    </AppBar>
                    <div className={classes.modal}>
                        <Grid container justify="center">
                            <Grid item xs={4} className={classes.slider}>
                                {/* <FileUploadFormField
                                    fields={fileUploadFields}
                                    index={0}
                                    form={form}
                                    errors={errors}
                                    //inputChangeHandler={this.handleFileDrop}
                                /> */}
                            </Grid>
                            {
                            color &&
                                <React.Fragment>
                                    <Grid item xs={12} className={classes.slider}>
                                        {/* <AvatarEditor
                                            className={`${classes.avatarEditor} ${(field.fileType === 'transparentImages') ? classes.avatarEditorTransparent : classes.avatarEditorOpaque}`}
                                            image={img}
                                            width={field.imgWidth}
                                            height={field.imgHeight}
                                            border={0}
                                            scale={scale}
                                            rotate={rotate}
                                        /> */}
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} className={classes.slider}>
                                        {/* <Grid container justify="space-between">
                                            <Grid item xs={3}>
                                                <Typography id={`${field.id}-zoom-slider`} gutterBottom>Scale</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Slider 
                                                    value={scale}
                                                    onChange={(e, value) => this.setState({ scale: value })}
                                                    defaultValue={1.00}
                                                    //getAriaValueText={value}
                                                    aria-labelledby={`${field.id}-zoom-slider`}
                                                    step={0.0001}
                                                    //marks
                                                    min={0.25}
                                                    max={2.00}
                                                    //valueLabelDisplay="auto"
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom>{Math.floor(scale * 100)}%</Typography>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} className={classes.slider}>
                                        {/* <Grid container justify="space-between">
                                            <Grid item xs={3}>
                                                <Typography id={`${field.id}-rotate-slider`} gutterBottom>Rotate</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Slider 
                                                    value={rotate}
                                                    onChange={(e, value) => this.setState({ rotate: value })}
                                                    defaultValue={0.0}
                                                    //getAriaValueText={value}
                                                    aria-labelledby={`${field.id}-rotate-slider`}
                                                    step={0.1}
                                                    //marks
                                                    min={-180}
                                                    max={180}
                                                    //valueLabelDisplay="on"
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom>{rotate}&deg;</Typography>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                </React.Fragment>
                            }
                        </Grid>
                    </div>
                </Dialog>
                <Dialog
                    fullScreen
                    open={dialogOpen === 'manual'}
                    onClose={() => this.handleClose()}
                    TransitionComponent={Transition}
                    disableEnforceFocus
                >
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => this.handleClose()} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>{field.label}: Set Manually</Typography>
                        <Button autoFocus color="inherit" onClick={() => this.handleClose()}>Save</Button>
                    </Toolbar>
                    </AppBar>
                    <div className={classes.modal}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6}>
                                <ColorPicker
                                    name='color'
                                    defaultValue='The colors, Duke!!!'
                                    onChange={color => this.handleColorChange(color)}
                                />
                            </Grid>
                            {
                            color &&
                                <React.Fragment>
                                    <Grid item xs={12} className={classes.slider}>
                                        {/* <AvatarEditor
                                            className={`${classes.avatarEditor} ${(field.fileType === 'transparentImages') ? classes.avatarEditorTransparent : classes.avatarEditorOpaque}`}
                                            image={img}
                                            width={field.imgWidth}
                                            height={field.imgHeight}
                                            border={0}
                                            scale={scale}
                                            rotate={rotate}
                                        /> */}
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} className={classes.slider}>
                                        {/* <Grid container justify="space-between">
                                            <Grid item xs={3}>
                                                <Typography id={`${field.id}-zoom-slider`} gutterBottom>Scale</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Slider 
                                                    value={scale}
                                                    onChange={(e, value) => this.setState({ scale: value })}
                                                    defaultValue={1.00}
                                                    //getAriaValueText={value}
                                                    aria-labelledby={`${field.id}-zoom-slider`}
                                                    step={0.0001}
                                                    //marks
                                                    min={0.25}
                                                    max={2.00}
                                                    //valueLabelDisplay="auto"
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom>{Math.floor(scale * 100)}%</Typography>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} className={classes.slider}>
                                        {/* <Grid container justify="space-between">
                                            <Grid item xs={3}>
                                                <Typography id={`${field.id}-rotate-slider`} gutterBottom>Rotate</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Slider 
                                                    value={rotate}
                                                    onChange={(e, value) => this.setState({ rotate: value })}
                                                    defaultValue={0.0}
                                                    //getAriaValueText={value}
                                                    aria-labelledby={`${field.id}-rotate-slider`}
                                                    step={0.1}
                                                    //marks
                                                    min={-180}
                                                    max={180}
                                                    //valueLabelDisplay="on"
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom>{rotate}&deg;</Typography>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                </React.Fragment>
                            }
                        </Grid>
                    </div>
                </Dialog>
            </Grid>
        );
    }
}

ColorPickerFormField.propTypes = {
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(useStyles, { withTheme: true })(ColorPickerFormField);