import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormRenderer from '../Forms/FormRenderer';
import {
  updateInstance,
  updateOnboardingProgress,
} from '../redux/actions/instanceActions';
//import { Null } from 'mdi-material-ui';

class GSForm extends React.Component {
  state = {
    filledToggles: {},
    onboardingSection: null,
    questionClearQueue: {},
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
    const { questionProgressValues } = this.state;
    let newQuestionProgressValues = { ...questionProgressValues };
    let requiredQuestions;

    questionGroups.forEach(group => {
      requiredQuestions = [ ...group.questions.filter(q => q.type === 'radioToggle' || (q.validators && q.validators.includes('required'))) ];

      requiredQuestions.forEach(question => {
        this.setQuestionProgressValues(newQuestionProgressValues, (100 / questionGroups.length) / requiredQuestions.length, question);
      });
    });

    this.setState({ questionProgressValues: newQuestionProgressValues });
  }

  setQuestionProgressValues = (questionProgressValues, totalPoints, question) => {
    questionProgressValues[question.id] = totalPoints;
    question.type === 'radioToggle' && question.fields.forEach(field => this.setQuestionProgressValues(questionProgressValues, totalPoints / question.fields.length, field))
  };

  incrementOnboardingProgress = (question, onboardingProgress, questionClearQueue) => {
    const { onboardingSection, questionProgressValues } = this.state;
    const { filled, id, parents } = question;

    let newOnboardingProgress = { ...onboardingProgress };

    if (parents && parents.length) {
      if (parents[0] in questionClearQueue) {
        if (filled === true) { newOnboardingProgress[onboardingSection] += questionProgressValues[id] }
        else {
          newOnboardingProgress[onboardingSection] -= questionProgressValues[id];
          if (newOnboardingProgress[onboardingSection] < 0) { newOnboardingProgress[onboardingSection] = 0 }
        }

        return newOnboardingProgress;
      }
    } else if (filled === true) { newOnboardingProgress[onboardingSection] += questionProgressValues[id] }
    else {
      newOnboardingProgress[onboardingSection] -= questionProgressValues[id];
      if (newOnboardingProgress[onboardingSection] < 0) { newOnboardingProgress[onboardingSection] = 0 }
    }

    return newOnboardingProgress;
  }

  updateQuestionClearQueue = (id, question, parents, questionClearQueue) => {
    let parentId;

    if (!('filled' in question)) { question.filled = (('value' in question) && question.value) ? true : false }
    
    if (!('isRequired' in question)) {
      if (('validators' in question) && (question.validators.includes('required'))) {
        question.isRequired = true;
      } else {
        question.isRequired = false;
      }
    }

    if (!parents || !parents.length) { return {
      ...questionClearQueue,
      [id]: [{
        id: question.id,
        isRequired: question.isRequired,
        name: question.name,
        parents: [],
        filled: question.filled,
      }],
    }};

    parentId = parents[0];

    if (parentId in questionClearQueue) {
      for (let i = 0; i < questionClearQueue[parentId].length; i++) {
        if (questionClearQueue[parentId][i].id === id) {
          questionClearQueue[parentId][i].filled = question.filled;
          return questionClearQueue; 
        }
      }
      questionClearQueue[parentId].push({
        id: question.id,
        isRequired: question.isRequired,
        name: question.name,
        parents: question.parents,
        filled: question.filled,
      });

      return questionClearQueue;
    }

    return questionClearQueue;
  }

  handleRadioToggleChange = (value, id, fields, parents) => {
    const { instance, onboardingProgress, updateInstance } = this.props;
    const { filledToggles, questionClearQueue } = this.state;

    let newFilledToggles = { ...filledToggles };
    let newInstance = { ...instance };
    let newOnboardingProgress = { ...onboardingProgress };
    let newQuestionClearQueue = { ...questionClearQueue };

    newFilledToggles[id] = value;

    if (value === true) {
      newQuestionClearQueue[id] = [];
      fields.forEach(field => newQuestionClearQueue[id].push({
        id: field.id,
        isRequired: true,
        name: field.name,
        parents: field.parents,
        value: null,
        filled: false,
      }));
    }

    if ((value === false) && (filledToggles[id] === true)) {
      fields.forEach(field => {
        field.name && delete newInstance[field.name];
        newQuestionClearQueue = this.updateQuestionClearQueue(field.id, field, field.parents, newQuestionClearQueue);
        if (field.isRequired) { newOnboardingProgress = this.incrementOnboardingProgress(field, newOnboardingProgress, newQuestionClearQueue) }
      });
      newOnboardingProgress = this.incrementOnboardingProgress({
        filled: true,
        id,
      }, newOnboardingProgress, newQuestionClearQueue);
      
      parents.forEach(parent => {
        newQuestionClearQueue[parent].fields.forEach(field => {
          field.name && delete newInstance[field.name];
          newQuestionClearQueue = this.updateQuestionClearQueue(field.id, field, [ parent ], newQuestionClearQueue);
          if (field.isRequired) { newOnboardingProgress = this.incrementOnboardingProgress(field, newOnboardingProgress, newQuestionClearQueue) }
        });
        newOnboardingProgress = this.incrementOnboardingProgress({
          filled: newFilledToggles[parent] || false,
          id,
        }, newOnboardingProgress, newQuestionClearQueue);
      });

      updateInstance({
        ...newInstance,
        'onboarding_progress': newOnboardingProgress,
      });

      this.setState({
        filledToggles: newFilledToggles,
        questionClearQueue: newQuestionClearQueue,
      });
    } else {
      newOnboardingProgress = this.incrementOnboardingProgress({
        filled: !(id in filledToggles) && (value === false),
        id,
      }, newOnboardingProgress, newQuestionClearQueue);

      updateInstance({
        ...newInstance,
        'onboarding_progress': newOnboardingProgress,
      });

      this.setState({
        filledToggles: newFilledToggles,
        questionClearQueue: newQuestionClearQueue,
      });
    }
  }

  handleInputChange = (value, id, name, isRequired, parents) => {
    const { instance, onboardingProgress, updateInstance } = this.props;
    const { questionClearQueue } = this.state;
    let newOnboardingProgress;
    let newInstance = { ...instance };
    let question = {
      id: id,
      isRequired,
      filled: value ? true : false,
      name: name,
      parents,
      value: value,
    };
    let newQuestionClearQueue;

    if (value) {
      if (name) { newInstance[name] = value }
      newQuestionClearQueue = this.updateQuestionClearQueue(id, question, parents, questionClearQueue);

      if (isRequired) {
        newOnboardingProgress = this.incrementOnboardingProgress(question, onboardingProgress, newQuestionClearQueue);
        newInstance['onboarding_progress'] = newOnboardingProgress;
        updateInstance(newInstance);
      } else {
        name && updateInstance(newInstance);
      }

      this.setState({ questionClearQueue: newQuestionClearQueue });
    } else {
      if (name in newInstance) { delete newInstance[name] }
      newQuestionClearQueue = this.updateQuestionClearQueue(id, question, parents, questionClearQueue);

      if (isRequired) {
        newOnboardingProgress = this.incrementOnboardingProgress(question, onboardingProgress, newQuestionClearQueue);
        newInstance['onboarding_progress'] = newOnboardingProgress;
        updateInstance(newInstance);
      }

      this.setState({ questionClearQueue: newQuestionClearQueue });
    }
  }

  render() {
    const { blurb, questionGroups } = this.props;

    return (
        <FormRenderer
            blurb={blurb}    
            questionGroups={questionGroups}
            radioToggleChangeCallback={data => this.handleRadioToggleChange(data.value, data.id, data.fields, data.parents)}
            inputChangeCallback={data => this.handleInputChange(data.value, data.id, data.name, data.isRequired, data.parents)}
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