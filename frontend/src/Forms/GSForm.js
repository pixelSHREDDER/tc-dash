import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormRenderer from '../Forms/FormRenderer';
import {
  updateInstance,
  updateOnboardingProgress,
} from '../redux/actions/instanceActions';

class GSForm extends React.Component {
  state = {
    filledQuestions: {},
    onboardingSection: null,
    questionProgressValues: {},
  }
  
  componentDidMount = () => {
    this.setProgressValues();
    this.setState({
      onboardingSection: this.props.location.pathname.replace('/get-started/', '').replace('-', '_'),
    })
  }

  setProgressValues = () => {
    const { questionGroups } = this.props;
    let newQuestionProgressValues = this.state.questionProgressValues;

    questionGroups.forEach(group => {
      group.questions.forEach(question => {
        this.setQuestionProgressValues(newQuestionProgressValues, (100 / questionGroups.length) / group.questions.length, question);
      });
    });
  }

  setQuestionProgressValues = (questionProgressValues, totalPoints, question) => {
    questionProgressValues[question.id] = totalPoints;
    question.type === 'radioToggle' && question.fields.forEach(field => this.setQuestionProgressValues(questionProgressValues, totalPoints / question.fields.length, field))
  };

  //handleRadioChange = (data) => {
  handleInputChange = (data) => {
    const { handleUpdateInstance, instance, onboardingProgress, updateOnboardingProgress } = this.props;
    const { filledQuestions, onboardingSection, questionProgressValues } = this.state;
    let newOnboardingProgress = { ...onboardingProgress };
    let newFilledQuestions = { ...filledQuestions };

    if (!(data.field in filledQuestions)) {
      filledQuestions[data.field] = true;
      if (data.value) {
        newOnboardingProgress[onboardingSection] += questionProgressValues[data.field];
      }
    } else if (!data.value) {
      newOnboardingProgress[onboardingSection] -= questionProgressValues[data.field];
      if (newOnboardingProgress[onboardingSection] < 0) { newOnboardingProgress[onboardingSection] = 0 }
      delete newFilledQuestions[data.field];
      this.setState({ filledQuestions: newFilledQuestions });
  }
    updateOnboardingProgress(newOnboardingProgress);
    updateInstance(data);
  }

  /*handleInputChange = (data) => {
    const { onboardingProgress } = this.props;
    console.log(data);
    console.log(this.props.questionGroups);
    //TODO: Replace with call to internal progress func
    (data.value !== null) ? onboardingProgress.social_media += (2.7777777778 / data.fieldCount) : onboardingProgress.social_media -= (2.7777777778 / data.fieldCount);
  }*/

  render() {
    const { blurb, questionGroups } = this.props;

    return (
        <FormRenderer
            blurb={blurb}    
            questionGroups={questionGroups}
            //radioChangeCallback={(data) => this.handleRadioChange(data)}
            radioChangeCallback={(data) => this.handleInputChange(data)}
            inputChangeCallback={(data) => this.handleInputChange(data)}
        />
    )
  }
}

GSForm.propTypes = {
  blurb: PropTypes.object,
  instance: PropTypes.object.isRequired,
  onboardingProgress: PropTypes.object.isRequired,
  questionGroups: PropTypes.array.isRequired,
  updateInstance: PropTypes.func.isRequired,
  updateOnboardingProgress: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    updateInstance: data => dispatch(updateInstance(data)),
    updateOnboardingProgress: data => dispatch(updateOnboardingProgress(data))
  }
}

const mapStateToProps = state => ({
  instance: state.instance,
  onboardingProgress: state.instance.onboarding_progress,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GSForm));