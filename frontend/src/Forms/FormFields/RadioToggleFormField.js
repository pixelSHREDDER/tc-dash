import React from 'react';
import PropTypes from 'prop-types';
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

    renderRadioToggleField = (label, description, optionLabels, fields, index, form, errors) => {
        const { classes, inputChangeHandler } = this.props;
        const { openForms } = this.state;
        
        return (
            <Grid item xs={12}>
                <React.Fragment>
                    <RadioToggleControls
                        label={label}
                        description={description || ''}
                        optionLabels={optionLabels || ['Yes', 'No']}
                        inputKey={label.replace(/ /g, '_')}
                        sendRadio={data => this.handleRadioToggle(data, label.replace(/ /g, '_'))}
                    />
                    {
                    ((label.replace(/ /g, '_') in openForms) && (openForms[label.replace(/ /g, '_')] === true)) &&
                        <React.Fragment>
                            <fieldset className={classes.fieldset}>
                                <div className={classes.grid}>
                                    <Grid container spacing={2}>
                                        {fields.map((field, index) => (
                                            <React.Fragment key={`${field.id}_${index}`}>
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
                                                        {this.renderRadioToggleField(field.label, field.description, field.optionLabels, field.fields, index, form, errors)}
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
        const { label, description, optionLabels, fields, /*index,*/ form, errors } = this.props;
    
        return (
            <React.Fragment>  
                {this.renderRadioToggleField(label, description, optionLabels, fields, /*index*/0, form, errors)}
            </React.Fragment>
        );
    }
}

RadioToggleFormField.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    optionLabels: PropTypes.array,
    fields: PropTypes.array.isRequired,
    //index: PropTypes.number.isRequired,
    form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    radioChangeHandler: PropTypes.func.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(RadioToggleFormField);