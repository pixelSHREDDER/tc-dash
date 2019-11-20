import React from 'react';
import PropTypes from 'prop-types';
import FormValidators from './FormValidators';
import TextFormField from './FormFields/TextFormField';
import PasswordFormField from './FormFields/PasswordFormField';
import RadioFormField from './FormFields/RadioFormField';
import RadioToggleFormField from './FormFields/RadioToggleFormField';
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
  });

class FormRenderer extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                text: '',
            },
            errors: {},
        };
    };

    validateProperty = (data, validators) => {
        let errorMessage = '';

        for (let v in validators) {
            if (validators[v] in FormValidators) {
                let error = FormValidators[validators[v]](data);
                if (error.length) errorMessage.length ? errorMessage += `, and ${error.replace(/^\w/, c => c.toLowerCase())}` : errorMessage += error;
            }
        };

        return errorMessage.length ? `${errorMessage} :(` : '';
    }

    handleInputChange = (value, field, validators) => {
        const { inputChangeCallback } = this.props;
        const { errors } = this.state;
        const formErrors = {...errors};
        const errorMessage = this.validateProperty(value, validators);

        if (errorMessage) formErrors[field] = errorMessage;
        else delete formErrors[field];
        this.setState({ errors: formErrors });
        if (!formErrors.length) inputChangeCallback({ field, value, fieldCount: 0 });
    };

    render() {
        const { classes, questionGroups, radioChangeCallback } = this.props;
        const { errors, form } = this.state;
    
        return (
            <React.Fragment>
                <div className={classes.root}>
                    {questionGroups.map(questionGroup => (
                        <React.Fragment key={('title' in questionGroup) ? questionGroup.title.toLowerCase().replace(' ', '') : 'questiongroup'}>
                            <Paper className={`${classes.paper} ${(questionGroup.questions.length > 3) ? classes.large : null}`}>
                                {
                                ('title' in questionGroup) &&
                                    <Typography variant="h6" component="h2">{questionGroup.title}</Typography>
                                }
                                {questionGroup.questions.map((question, index) => (
                                    <React.Fragment key={question.label.toLowerCase().replace(' ', '')}>
                                        {
                                        (question.type === 'password') &&
                                            <PasswordFormField
                                                fields={questionGroup.questions}
                                                index={index}
                                                form={form}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                                //inputChangeHandler={data => this.handleInputChange(data, question.label.toLowerCase().replace(' ', ''), question.validators)}
                                            />
                                        }
                                        {
                                        (question.type === 'radio') &&
                                            <RadioFormField
                                                fields={questionGroup.questions}
                                                index={index}
                                                form={form}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                                //inputChangeHandler={data => this.handleInputChange(data, question.label.toLowerCase().replace(' ', ''), question.validators)}
                                            />
                                        }
                                        {
                                        (question.type === 'radioToggle') &&
                                            <RadioToggleFormField
                                                label={question.label}
                                                description={question.description}
                                                optionLabels={question.optionLabels}    
                                                fields={question.fields}
                                                index={index}
                                                form={form}
                                                errors={errors}
                                                radioChangeHandler={radioChangeCallback}
                                                //radioChangeHandler={data => this.handleRadioToggle(data, question.label.toLowerCase().replace(' ', ''))}
                                                //radioChangeHandler={(data) => radioChangeHandler(data)}
                                                //inputChangeHandler={e => this.handleInputChange(e.target.value, question.label.toLowerCase().replace(' ', ''), question.validators)}
                                                inputChangeHandler={this.handleInputChange}
                                                //inputChangeHandler={(data) => inputChangeHandler(data)}
                                            />
                                        }
                                        {
                                        (question.type === 'text') &&
                                            <TextFormField
                                                fields={questionGroup.questions}
                                                index={index}
                                                form={form}
                                                errors={errors}
                                                inputChangeHandler={this.handleInputChange}
                                                //inputChangeHandler={data => this.handleInputChange(data, question.label.toLowerCase().replace(' ', ''), question.validators)}
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
    questionGroups: PropTypes.array.isRequired,
    radioChangeCallback: PropTypes.func.isRequired,
    inputChangeCallback: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(FormRenderer);