import React from 'react';
import PropTypes from 'prop-types';
import AcceptedFiles from '../AcceptedFiles';
import { DropzoneArea } from 'material-ui-dropzone';
import { withStyles } from '@material-ui/core/styles';
import {
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
} from '@material-ui/core';

const styles = theme => ({
    grid: {
        flexGrow: 1,
    },
    formHelperText: {
        marginBottom: theme.spacing(1),
    },
});

class FileUploadFormField extends React.Component {
    constructor() {
        super();
        this.state = {
            acceptedFiles: new AcceptedFiles(),
            field: null,
            loading: true,
        };
    };

    async componentDidMount() {
        const { fields, index } = this.props;
        const { acceptedFiles } = this.state;
        let newField = fields[index];

        if (!('label' in newField)) { newField.label = 'Fill me!'; }
        if (!('id' in newField)) { newField.id = newField.label.replace(/ /g, '_'); }
        if (!('filesLimit' in newField)) { newField.filesLimit = 1; }
        if (!('showPreviews' in newField)) { newField.showPreviews = true; }
        if (!('extraAttrs' in newField)) { newField.extraAttrs = {}; }

        newField.acceptedFiles = ('fileType' in newField && newField.fileType.length)
        ? acceptedFiles[newField.fileType]
        : acceptedFiles.getGeneric();

        newField.description = ('description' in newField && newField.description.length)
        ? `${newField.description} Accepted filetypes: ${newField.acceptedFiles.filetypes.join(', ')}`
        : `Accepted filetypes: ${newField.acceptedFiles.filetypes.join(', ')}`;

        this.setState({ field: newField, loading: false });
    }

    render() {
        const { classes, errors, fields, index, inputChangeHandler } = this.props;
        const { field, loading } = this.state;

        if (loading) { return <CircularProgress />; }

        return (
            <Grid item xs={12}>
                <FormControl error={field.id in errors} fullWidth>
                    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    <DropzoneArea
                        acceptedFiles={field.acceptedFiles.mimes}
                        dropzoneText={`Drag and drop ${field.acceptedFiles.dropzoneText} here or click`}
                        filesLimit={field.filesLimit}
                        maxFileSize={5000000}
                        onSave={inputChangeHandler}
                        showPreviewsInDropzone={false}
                        showPreviews={field.showPreviews}
                        showFileNamesInPreview
                        {...field.extraAttrs}
                    />
                    <FormHelperText>{field.description}</FormHelperText>
                    <FormHelperText id={`${field.id}-helper-text`} className={(index === (fields.length - 1)) ? classes.formHelperText : ''}>
                        {(field.id in errors) && <span>{errors[field.id]}</span>}
                    </FormHelperText>
                </FormControl>
            </Grid>
        );
    }
}

FileUploadFormField.propTypes = {
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(FileUploadFormField);