import React from 'react';
import PropTypes from 'prop-types';
import AcceptedFiles from '../AcceptedFiles';
import FileUploadFormField from './FileUploadFormField';
import { CloseIcon } from '../../Icons';
import AvatarEditor from 'react-avatar-editor'
//import 'tui-image-editor/dist/tui-image-editor.css';
//import ImageEditor from '@toast-ui/react-image-editor';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
    legend: {
        marginBottom: theme.spacing(1),
    },
    cardMedia: {
        height: 140,
        backgroundSize: 'contain',
        marginBottom: theme.spacing(1),
    },
    formHelperText: {
        marginBottom: theme.spacing(1),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    modal: {
        flexGrow: 1,
        padding: `0 ${theme.spacing(2)}px`,
    },
    avatarEditor: {
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
    },
    slider: {
        padding: theme.spacing(1),
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

class ImageUploadFormField extends React.Component {
    constructor() {
        super();
        this.state = {
            acceptedFiles: new AcceptedFiles(),
            dialogOpen: false,
            field: null,
            fileUploadFields: [{}],
            img: null,
            loading: true,
            rotate: 0.0,
            scale: 1.0,
        };
    };
    //editorRef = React.createRef();

    async componentDidMount() {
        const { fields, index } = this.props;
        const { acceptedFiles } = this.state;
        let newField = fields[index];
        let newFileUploadFields = [];

        if (!('imgWidth' in newField)) { newField.imgWidth = 500; }
        if (!('imgHeight' in newField)) { newField.imgHeight = 500; }
        if (!('fileType' in newField)) { newField.fileType = 'images'; }

        newField.acceptedFiles = acceptedFiles[newField.fileType];

        newField.description = ('description' in newField && newField.description.length)
        ? `${newField.description} Accepted filetypes: ${newField.acceptedFiles.filetypes.join(', ')}`
        : `Accepted filetypes: ${newField.acceptedFiles.filetypes.join(', ')}`;

        newFileUploadFields.push({
            id: `${newField.id}_file_upload`,
            fileType: newField.fileType,
            filesLimit: 1,
            showPreviews: false,
            extraAttrs: {
                onDrop: this.handleFileDrop,
            },
        });

        this.setState({
            field: newField,
            fileUploadFields: newFileUploadFields,
            // TODO: Replace with real data
            //img: fields[index].value || null,
            loading: false,
        });
    }

    handleClickOpen = () => this.setState({ dialogOpen: true });
    handleClose = () => {
        //const { dialogOpen } = this.state;
        //const editorInstance = this.editorRef.current.getInstance();
        //editorInstance.destroy();
        //if (data) { inputChangeHandler(data) }
        //if (dialogOpen === true) { this.setState({ dialogOpen: false }); }
        this.setState({ dialogOpen: false });
    }

    handleFileDrop = data => {
        //const { fields, index } = this.props;
        // TODO: add validation/size checking logic here
        console.log(data);
        this.setState({ img: data });
    }

    render() {
        const { classes, errors, fields, index } = this.props;
        const { dialogOpen, field, fileUploadFields, img, loading, rotate, scale } = this.state;

        if (loading) { return <CircularProgress />; }

        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                    <FormLabel component="legend" className={classes.legend}>{field.label}</FormLabel>
                    {/* TODO: Tie in label switching if img exists, to button and cardmedia image, set default image and use img url */}
                    <CardMedia className={classes.cardMedia} title={field.label} image={img ? `${img.webkitRelativePath}${img.name}` : 'https://ydwa.org/wp-content/uploads/2018/02/ydwa-header-logo.png'} />
                    <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen()}>Upload Image</Button>
                    <FormHelperText>{field.description}</FormHelperText>
                    <FormHelperText id={`${field.id}-helper-text`} className={(index === (fields.length - 1)) ? classes.formHelperText : ''}>
                        {(field.id in errors) && <span>{errors[field.id]}</span>}
                    </FormHelperText>
                </FormControl>
                <Dialog
                    fullScreen
                    open={dialogOpen}
                    onClose={() => this.handleClose()}
                    TransitionComponent={Transition}
                    disableEnforceFocus
                >
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => this.handleClose()} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>{field.label}</Typography>
                        <Button autoFocus color="inherit" onClick={() => this.handleClose()}>Save</Button>
                    </Toolbar>
                    </AppBar>
                    <div className={classes.modal}>
                        <Grid container justify="center">
                            <Grid item xs={4} className={classes.slider}>
                                <FileUploadFormField
                                    errors={errors}
                                    fields={fileUploadFields}
                                    index={0}
                                    //inputChangeHandler={this.handleFileDrop}
                                />
                            </Grid>
                            {
                            img &&
                                <React.Fragment>
                                    <Grid item xs={12} className={classes.slider}>
                                        <AvatarEditor
                                            className={`${classes.avatarEditor} ${(field.fileType === 'transparentImages') ? classes.avatarEditorTransparent : classes.avatarEditorOpaque}`}
                                            image={img}
                                            width={field.imgWidth}
                                            height={field.imgHeight}
                                            border={0}
                                            scale={scale}
                                            rotate={rotate}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} className={classes.slider}>
                                        <Grid container justify="space-between">
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
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} className={classes.slider}>
                                        <Grid container justify="space-between">
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
                                                {/* <Input
                                                    value={rotate}
                                                    margin="dense"
                                                    onChange={(e, value) => {this.setState({rotate: value})}}
                                                    onBlur={(e, value) => {this.setState({rotate: value})}}
                                                    inputProps={{
                                                        step: 0.5,
                                                        min: -180,
                                                        max: 180,
                                                        type: 'number',
                                                        'aria-labelledby': `${field.id}-rotate-slider`,
                                                    }}
                                                /> */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                            {/* <ImageEditor
                                ref={this.editorRef}
                                {...imageEditorOptions}
                            /> */}
                        </Grid>
                    </div>
                </Dialog>
            </Grid>
        );
    }
}

ImageUploadFormField.propTypes = {
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(ImageUploadFormField);