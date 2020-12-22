import React from 'react';
import PropTypes from 'prop-types';
import FormValidators from './FormValidators';
import ColorPickerFormField from './FormFields/ColorPickerFormField';
import FileUploadFormField from './FormFields/FileUploadFormField';
import ImageUploadFormField from './FormFields/ImageUploadFormField';
import PasswordFormField from './FormFields/PasswordFormField';
import PhoneFormField from './FormFields/PhoneFormField';
import RadioFormField from './FormFields/RadioFormField';
import RadioToggleFormField from './FormFields/RadioToggleFormField';
import RankedChoicesFormField from './FormFields/RankedChoicesFormField';
import SelectFormField from './FormFields/SelectFormField';
import StateFormField from './FormFields/StateFormField';
import TextFormField from './FormFields/TextFormField';
import TextareaFormField from './FormFields/TextareaFormField';
//import ZipFormField from './FormFields/ZipFormField';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography
} from '@material-ui/core';

// Masonry grid layout found here: https://codesandbox.io/s/p5v42zrrzm
const styles = theme => ({
    root: {
      display: "grid",
      gridTemplateColumns: "50% auto",
      gridGap: theme.spacing(2),
      gridAutoFlow: "row dense",
      boxSizing: "border-box",
      [theme.breakpoints.down('sm')]: {
          display: "block",
      },
    },
    paper: {
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
          marginBottom: theme.spacing(2),
      },
    },
    large: {
      gridRow: "auto / span 2",
      [theme.breakpoints.down('sm')]: {
          gridRow: "none",
      },
    },
    blurb: {
        marginBottom: theme.spacing(2),
    },
});

class FormRenderer extends React.Component {
    state = {
        errors: {},
        questionGroups: [],
    };

    componentDidMount = () => {
        const { classes, questionGroups } = this.props;
        let newQuestionGroups = [ ...questionGroups ];

        newQuestionGroups.forEach(questionGroup => {
            questionGroup.classNames = `${classes.paper}${(questionGroup.questions.length > 3) ? ' ' + classes.large : ''}`;
            questionGroup.id = ('title' in questionGroup ? questionGroup.title.toLowerCase().replace(' ', '_') : 'question_group');

            questionGroup.questions.forEach(question => {
                if (!('label' in question)) {
                    switch (question.type) {
                        case 'colorPicker':
                            question.label = 'Pick a Color';
                            break;
                        case 'imageUpload':
                            question.label = 'Upload an Image';
                            break;
                        case 'password':
                            question.label = 'Password';
                            break;
                        case 'phone':
                            question.label = 'Please enter a phone number';
                            break;
                        case 'radio':
                            question.label = 'Pick one!';
                            break;
                        case 'select':
                            question.label = 'Please select an option';
                            break;
                        case 'state':
                            question.label = 'State';
                            break;
                        case 'zip':
                            question.label = 'Zip Code';
                            break;
                        default:
                            question.label = 'Fill me!';
                            break;
                    }
                }
                if (!('id' in question)) { question.id = question.label.replace(/ /g, '_'); }
                if (!('parents' in question)) { question.parents = [] }
            });
        });

        this.setState({ questionGroups: newQuestionGroups });
    }

    validateProperty = (data, validators) => {
        let message = '';
        let isRequired = false;

        for (let v in validators) {
            if (validators[v] === 'required') { isRequired = true }
            if (validators[v] in FormValidators) {
                let error = FormValidators[validators[v]](data);
                if (error.length) { message.length ? message += `, and ${error.replace(/^\w/, c => c.toLowerCase())}` : message += error }
            }
        };

        return {
            errorMessage: message.length ? `${message} :(` : '',
            isRequired,
        };
    }

    handleInputChange = (value, id, name, validators, parents) => {
        const { errorMessage, isRequired } = this.validateProperty(value, validators);
        let formErrors = {...this.state.errors};

        if (errorMessage) { formErrors[id] = errorMessage }
        else { delete formErrors[id] }

        if (!formErrors.length) { this.props.inputChangeCallback({ value, id, name, isRequired, parents }) }

        this.setState({ errors: formErrors });
    };

    render() {
        const { blurb, classes, inputChangeCallback, radioToggleChangeCallback } = this.props;
        const { errors, questionGroups } = this.state;
    
        return (
            <React.Fragment>
            {
            blurb &&
                <Paper className={`${classes.paper} ${classes.blurb}`}>
                    <Typography variant="h6" component="h2">{blurb.title}</Typography>
                    {
                    blurb.paragraphs.map((paragraph, pIndex) => (
                        <Typography key={pIndex} variant="caption" component="h3">{paragraph}</Typography>
                    ))}
                </Paper>
            }
                <div className={classes.root}>
                    {
                    questionGroups.map((questionGroup, qgIndex) => (
                        <React.Fragment key={`${questionGroup.id}_${qgIndex}`}>
                            <Paper className={questionGroup.classNames}>
                                {
                                ('title' in questionGroup) &&
                                    <Typography variant="h6" component="h2">{questionGroup.title}</Typography>
                                }
                                {
                                ('description' in questionGroup) &&
                                    <Typography variant="caption" component="h3" className={classes.blurb}>{questionGroup.description}</Typography>
                                }
                                {
                                questionGroup.questions.map((question, qIndex) => (
                                    <React.Fragment key={`${questionGroup.id}_${qgIndex}_${qIndex}`}>
                                        {
                                        (question.type === 'colorPicker') &&
                                            <ColorPickerFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'fileUpload') &&
                                            <FileUploadFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'imageUpload') &&
                                            <ImageUploadFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'password') &&
                                            <PasswordFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'phone') &&
                                            <PhoneFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'radio') &&
                                            <RadioFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'radioToggle') &&
                                            <RadioToggleFormField
                                                id={question.id}
                                                label={question.label}
                                                description={question.description}
                                                optionLabels={question.optionLabels}    
                                                fields={question.fields}
                                                index={qIndex}
                                                errors={errors}
                                                radioToggleChangeHandler={radioToggleChangeCallback}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'rankedChoices') &&
                                            <RankedChoicesFormField
                                                id={question.id}    
                                                label={question.label}
                                                description={question.description}
                                                choiceCount={question.choiceCount}
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeCallback={inputChangeCallback}
                                            />
                                        }
                                        {
                                        (question.type === 'select') &&
                                            <SelectFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'state') &&
                                            <StateFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'text') &&
                                            <TextFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'textarea') &&
                                            <TextareaFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                        {
                                        (question.type === 'zip') &&
                                            <TextFormField
                                                fields={questionGroup.questions}
                                                index={qIndex}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                            />
                                        }
                                    </React.Fragment>
                                ))}
                            </Paper>
                        </React.Fragment>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

FormRenderer.propTypes = {
    blurb: PropTypes.object,
    inputChangeCallback: PropTypes.func.isRequired,
    questionGroups: PropTypes.array.isRequired,
    radioToggleChangeCallback: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(FormRenderer);