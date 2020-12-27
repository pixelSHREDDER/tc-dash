import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FileUploadFormField from './FileUploadFormField';
import {
    CheckCircleIcon,
    CloseIcon,
} from '../../Icons';
import { ColorExtractor } from 'react-color-extractor'
import ColorPicker from 'material-ui-color-picker';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    CircularProgress,
    Dialog,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    Paper,
    Slide,
    Toolbar,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    legend: {
        marginBottom: theme.spacing(1),
    },
    swatch: {
        height: 140,
        backgroundColor: props => props.color ? props.color : '#EFEFEF',
        backgroundSize: 'contain',
        marginBottom: theme.spacing(1),
    },
    swatchLabel: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    },
    cardButton: {
        width: '100%',
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
        padding: theme.spacing(2),
    },
    modalImage: {
        maxWidth: '100%',
    },
    swatchButton: {
        width: '100%',
        color: '#FFFFFF',
        fontWeight: 500,
        textShadow: '1px 1px 2px rgba(0,0,0,1.0)',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ColorPickerFormField = ({fields, index, errors, inputChangeHandler}) => {
    const [dialogOpen, setDialogOpen] = useState(null);
    const [fileUploadFields, setFileUploadFields] = useState([]);
    const [field, setField] = useState(null);
    const [color, setColor] = useState(null);
    const [imageColors, setImageColors] = useState([]);
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(true);
    const classes = useStyles({color});

    useEffect(() => {
        if ((typeof(fields) === 'undefined') || (typeof(index) === 'undefined') || fileUploadFields.length) return;
        let newFieldDescription = 'You can choose a color manually, or upload an image to extract colors from.';
        let newField = fields[index];

        newField.description = `${('description' in newField && newField.description.length) ? newField.description : ''} ${newFieldDescription}`;

        setFileUploadFields([{
            id: `${newField.id}_file_upload`,
            fileType: 'images',
            filesLimit: 1,
            showPreviews: false,
            extraAttrs: {
                onDrop: data => setImg(URL.createObjectURL(data[0])),
            },
        }]);
        setField(newField);
        setLoading(false);
    }, [fields, index, fileUploadFields]);

    useEffect(() => {
        if (!color) return;
        inputChangeHandler(color);
    }, [color, inputChangeHandler]);

    if (loading) { return <CircularProgress />; }

    return (
        <Grid item xs={12}>
            <FormControl error={field.id in errors} fullWidth>
                <FormLabel component="legend" className={classes.legend}>{field.label}</FormLabel>
                <Paper className={classes.swatch} elevation={0}>
                    <Typography className={`${classes.swatchLabel} ${classes.swatchButton}`} variant="body2" component="h4">{color || 'No color selected. Pick using the options below!'}</Typography>
                </Paper>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Button className={classes.cardButton} variant="outlined" color="primary" onClick={() => setDialogOpen('image')}>Get From Image</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button className={classes.cardButton} variant="outlined" color="primary" onClick={() => setDialogOpen('manual')}>Set Manually</Button>
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
                onClose={() => setDialogOpen(null)}
                TransitionComponent={Transition}
                disableEnforceFocus
            >
                <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setDialogOpen(null)} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>{field.label}: Get From Image</Typography>
                    <Button autoFocus color="inherit" onClick={() => setDialogOpen(null)}>Save</Button>
                </Toolbar>
                </AppBar>
                <div className={classes.modal}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3} className={classes.slider}>
                            <FileUploadFormField
                                fields={fileUploadFields}
                                index={0}
                                errors={errors}
                            />
                        </Grid>
                        {
                        img &&
                            <React.Fragment>
                                <Grid item xs={12} sm={6} md={9} className={classes.slider}>
                                    <img className={classes.modalImage} src={img} alt="Uploaded" />
                                    <FormHelperText className={classes.formHelperText}>These were the most prominent colors found in the image. Please click one!</FormHelperText>
                                    <ColorExtractor className={classes.modalImage} src={img} getColors={data => setImageColors(data)} />
                                    <Grid container spacing={2} justify="center">
                                    {
                                    imageColors.map((imageColor, index) => (
                                        <Grid item xs={4} md={2} className={classes.slider} key={index}>
                                            <Button className={classes.swatchButton} variant="contained" style={{backgroundColor: imageColor}} onClick={() => setColor(imageColor)} endIcon={imageColor === color ? <CheckCircleIcon /> : null}>{imageColor.toString()}</Button>
                                        </Grid>
                                    ))}
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        }
                    </Grid>
                </div>
            </Dialog>
            <Dialog
                fullScreen
                open={dialogOpen === 'manual'}
                onClose={() => setDialogOpen(null)}
                TransitionComponent={Transition}
                disableEnforceFocus
            >
                <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setDialogOpen(null)} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>{field.label}: Set Manually</Typography>
                    <Button autoFocus color="inherit" onClick={() => setDialogOpen(null)}>Save</Button>
                </Toolbar>
                </AppBar>
                <div className={classes.modal}>
                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>
                            <ColorPicker
                                name={`${field.id}_color_picker`}
                                defaultValue='The colors, Duke!!!'
                                onChange={color => setColor(color)}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        </Grid>
    );
}

ColorPickerFormField.propTypes = {
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default ColorPickerFormField;