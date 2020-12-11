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
    let requiredQuestions;

    questionGroups.forEach(group => {
      requiredQuestions = [ ...group.questions.filter(q => q.validators && q.validators.includes('required')) ];

      requiredQuestions.forEach(question => {
        this.setQuestionProgressValues(newQuestionProgressValues, (100 / questionGroups.length) / requiredQuestions.length, question);
      });
    });
  }

  setQuestionProgressValues = (questionProgressValues, totalPoints, question) => {
    questionProgressValues[question.id] = totalPoints;
    question.type === 'radioToggle' && question.fields.forEach(field => this.setQuestionProgressValues(questionProgressValues, totalPoints / question.fields.length, field))
  };

  incrementOnboardingProgress = (value, id) => {
    const { onboardingProgress, updateOnboardingProgress } = this.props;
    const { filledQuestions, onboardingSection, questionProgressValues } = this.state;

    let newOnboardingProgress = { ...onboardingProgress };
    let newFilledQuestions = { ...filledQuestions };

    if (!(id in filledQuestions)) {
      filledQuestions[id] = true;
      if (value) {
        newOnboardingProgress[onboardingSection] += questionProgressValues[id];
      }
    } else if (!value) {
      newOnboardingProgress[onboardingSection] -= questionProgressValues[id];
      if (newOnboardingProgress[onboardingSection] < 0) { newOnboardingProgress[onboardingSection] = 0 }
      delete newFilledQuestions[id];
      this.setState({ filledQuestions: newFilledQuestions });
  }
    updateOnboardingProgress(newOnboardingProgress);
    return newOnboardingProgress;
  }

  //handleRadioChange = (data) => {
  handleInputChange = (value, id, name, isRequired) => {
    const { instance, updateInstance } = this.props;
    let newInstance = instance;

    newInstance[name] = value;
    if (isRequired) { newInstance['onboarding_progress'] = this.incrementOnboardingProgress(value, id) }
    updateInstance(newInstance);
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
            radioChangeCallback={data => this.handleInputChange(data.value, data.id, data.name, data.isRequired)}
            inputChangeCallback={data => this.handleInputChange(data.value, data.id, data.name, data.isRequired)}
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