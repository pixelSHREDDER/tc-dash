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
    state = {
        //id: null,
        sections: {},
    };

    componentDidMount = () => {
        const { description, fields, id, label, optionLabels } = this.props;
        //const id = label.replace(/ /g, '_');

        this.setState({
            //id,
            sections: this.populateSections(this.state.sections, fields, id, optionLabels, label, description, []),
        });
    }

    populateSections = (sections, fields, id, optionLabels, label, description, parents) => {
        const childSections = fields.filter(field => field.type === 'radioToggle');

        let newFields = [ ...fields ];
        let newSections = { ...sections };

        newFields.forEach(field => {
            //field.id = field.label.replace(/ /g, '_');
            field.parents = [ ...parents, id];
        })

        newSections[id] = {
            description: description || '',
            fields: newFields,
            label,
            open: false,
            optionLabels: optionLabels || ['Yes', 'No'],
            parents: parents,
        }

        childSections.forEach(childSection => newSections = this.populateSections(newSections, childSection.fields, /*childSection.label.replace(/ /g, '_')*/childSection.id, childSection.optionLabels, childSection.label, childSection.description, [ ...parents, id ]));

        return newSections;
    }

    handleRadioToggle = (value, id, fields, parents) => {
        let sections = { ...this.state.sections };

        value = (value === 'true') ? true : (value === 'false') ? false : null;
        sections[id].open = value;
        this.props.radioToggleChangeHandler({ value, id, fields, parents });

        this.setState({ sections });
    };

    renderRadioToggleField = (section, id) => {
        const { classes, errors, inputChangeHandler } = this.props;
        
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <React.Fragment>
                        <RadioToggleControls
                            label={section.label}
                            description={section.description}
                            optionLabels={section.optionLabels}
                            inputKey={id}
                            sendRadio={data => this.handleRadioToggle(data, id, section.fields, section.parents)}
                        />
                        { section.open &&
                            <React.Fragment>
                                <fieldset className={classes.fieldset}>
                                    <div className={classes.grid}>
                                        <Grid container spacing={2}>
                                            { section.fields && section.fields.map((field, index) => (
                                                <React.Fragment key={`${field.id}_${index}`}>
                                                    {
                                                    (field.type === 'colorPicker') &&
                                                        <ColorPickerFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'fileUpload') &&
                                                        <FileUploadFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'imageUpload') &&
                                                        <ImageUploadFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'password') &&
                                                        <PasswordFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'phone') &&
                                                        <PhoneFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'radio') &&
                                                        <RadioFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'radioToggle') &&
                                                        <React.Fragment>
                                                            {this.renderRadioToggleField(this.state.sections[field.id], field.id)}
                                                        </React.Fragment>
                                                    }
                                                    {
                                                    (field.type === 'rankedChoices') &&
                                                        <RankedChoicesFormField
                                                            label={field.label}
                                                            description={field.description}
                                                            choiceCount={field.choiceCount}
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'select') &&
                                                        <SelectFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'state') &&
                                                        <StateFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'text') &&
                                                        <TextFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'textarea') &&
                                                        <TextareaFormField
                                                            fields={section.fields}
                                                            index={index}
                                                            errors={errors}
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    }
                                                    {
                                                    (field.type === 'zip') &&
                                                        <TextFormField
                                                            fields={section.fields}
                                                            index={index}
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
            </React.Fragment>
        );
    };

    render() {
        const { id } = this.props;
        const { /*id, */sections } = this.state;
        // TODO: Add loader?
        return (id in sections) ? this.renderRadioToggleField(sections[id], id) : '';
    };
}

RadioToggleFormField.propTypes = {
    description: PropTypes.string,
    errors: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    optionLabels: PropTypes.array,
    radioToggleChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(RadioToggleFormField);