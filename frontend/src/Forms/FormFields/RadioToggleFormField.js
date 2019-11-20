import React from 'react';
import PropTypes from 'prop-types';
import TextFormField from './TextFormField';
import PasswordFormField from './PasswordFormField';
import RadioFormField from './RadioFormField';
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
        console.log(field);
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
                        sendRadio={(data) => this.handleRadioToggle(data, label.replace(/ /g, '_'))}
                    />
                    {
                    ((label.replace(/ /g, '_') in openForms) && (openForms[label.replace(/ /g, '_')] === true)) &&
                        <React.Fragment>
                            <fieldset className={classes.fieldset}>
                                <div className={classes.grid}>
                                    <Grid container spacing={2}>
                                        {fields.map((field, index) => (
                                            <React.Fragment key={field.id}>
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
                                                (field.type === 'text') &&
                                                    <TextFormField
                                                        fields={fields}
                                                        index={index}
                                                        form={form}
                                                        errors={errors}
                                                        inputChangeHandler={data => inputChangeHandler(data, field.id, field.validators)}
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