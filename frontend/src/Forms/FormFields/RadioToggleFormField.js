import React from 'react';
import PropTypes from 'prop-types';
import ColorPickerFormField from './ColorPickerFormField';
import FileUploadFormField from './FileUploadFormField';
import ImageUploadFormField from './ImageUploadFormField';
import PasswordFormField from './PasswordFormField';
import PhoneFormField from './PhoneFormField';
import RadioFormField from './RadioFormField';
import RankedChoicesFormField from './RankedChoicesFormField';
import SelectFormField from './SelectFormField';
import StateFormField from './StateFormField';
import TextFormField from './TextFormField';
import TextareaFormField from './TextareaFormField';
//import ZipFormField from './ZipFormField';
import RadioToggleControls from './RadioToggleControls';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
} from '@material-ui/core';

const styles = theme => ({
    grid: {
        flexGrow: 1,
    },
    fieldset: {
        margin: `${theme.spacing(3)}px 0`,
        padding: theme.spacing(2),
    },
});

class RadioToggleFormField extends React.Component {
    constructor() {
        super();
        this.state = {
            openForms: {},
        };
        this.renderRadioToggleField = this.renderRadioToggleField.bind(this);
    };

    handleRadioToggle = (value, field) => {
        const { radioChangeHandler } = this.props;
        const { openForms } = this.state;
        value = (value === 'true') ? true : (value === 'false') ? false : null;
        this.setState({ openForms: { ...openForms, [field]: value } });
        radioChangeHandler({ field, value, fieldCount: 0 });
    };

    renderRadioToggleField = (id, label, description, optionLabels, fields, index, form, errors) => {
        const { classes, inputChangeHandler } = this.props;
        const { openForms } = this.state;
        
        return (
            <Grid item xs={12}>
                <React.Fragment>
                    <RadioToggleControls
                        label={label}
                        description={description || ''}
                        optionLabels={optionLabels || ['Yes', 'No']}
                        inputKey={id}
                        sendRadio={data => this.handleRadioToggle(data, id)}
                    />
                    {
                    ((id in openForms) && (openForms[id] === true)) &&
                        <React.Fragment>
                            <fieldset className={classes.fieldset}>
                                <div className={classes.grid}>
                                    <Grid container spacing={2}>
                                        {fields.map((field, index) => (
                                            <React.Fragment key={`${field.id}_${index}`}>
                                                {
                                                (field.type === 'colorPicker') &&
                                                    <ColorPickerFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'fileUpload') &&
                                                    <FileUploadFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'imageUpload') &&
                                                    <ImageUploadFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'password') &&
                                                    <PasswordFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'phone') &&
                                                    <PhoneFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'radio') &&
                                                    <RadioFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'radioToggle') &&
                                                    <React.Fragment>
                                                        {this.renderRadioToggleField(field.id, field.label, field.description, field.optionLabels, field.fields, index, form, errors)}
                                                    </React.Fragment>
                                                }
                                                {
                                                (field.type === 'rankedChoices') &&
                                                    <RankedChoicesFormField
                                                        label={field.label}
                                                        description={field.description}
                                                        choiceCount={field.choiceCount}
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'select') &&
                                                    <SelectFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'state') &&
                                                    <StateFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                                {
                                                (field.type === 'text') &&
                                                    <TextFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={data => inputChangeHandler(data, field.id, field.validators)}
                                                    />
                                                }
                                                {
                                                (field.type === 'textarea') &&
                                                    <TextareaFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={data => inputChangeHandler(data, field.id, field.validators)}
                                                    />
                                                }
                                                {
                                                (field.type === 'zip') &&
                                                    <TextFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={inputChangeHandler}
                                                    />
                                                }
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </div>
                            </fieldset>
                        </React.Fragment>
                    }
                </React.Fragment>
            </Grid>
        );
    };

    render() {
        const { id, label, description, optionLabels, fields, /*index,*/ form, errors } = this.props;
    
        return (
            <React.Fragment>  
                {this.renderRadioToggleField(id, label, description, optionLabels, fields, /*index*/0, form, errors)}
            </React.Fragment>
        );
    }
}

RadioToggleFormField.propTypes = {
    description: PropTypes.string,
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    //index: PropTypes.number.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    optionLabels: PropTypes.array,
    radioChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(RadioToggleFormField);