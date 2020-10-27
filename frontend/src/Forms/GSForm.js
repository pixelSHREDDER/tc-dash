import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormRenderer from '../Forms/FormRenderer';
//import { updateOnboardingProgress } from '../redux/actions/instanceActions';
import { updateInstance } from '../redux/actions/instanceActions';

class GSForm extends React.Component {
  //constructor(props) {
    //super(props);
    //this.state = {
    state = {
      questionProgressValues: {},
    }
  //};
  
  componentDidMount = () => {
    this.setProgressValues();
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
    questionProgressValues[question.id] = {
      filled: false,
      points: totalPoints,
    };
    question.type === 'radioToggle' && question.fields.forEach(field => this.setQuestionProgressValues(questionProgressValues, totalPoints / question.fields.length, field))
  };

  //handleRadioChange = (data) => {
  handleInputChange = (data) => {
    const { onboardingProgress, updateInstance } = this.props;
    const {questionProgressValues } = this.state;
    let newOnboardingProgress = { ...onboardingProgress };

    console.log(data);
    if (questionProgressValues[data.field].filled) { return }
    questionProgressValues[data.field].filled = true;
    
    data.value !== null ? newOnboardingProgress.social_media += questionProgressValues[data.field].points : newOnboardingProgress.social_media -= questionProgressValues[data.field].points;
    updateInstance({ onboardingProgress: newOnboardingProgress });
    console.log(onboardingProgress, newOnboardingProgress);
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
  onboardingProgress: PropTypes.object.isRequired,
  questionGroups: PropTypes.array.isRequired,
  //updateOnboardingProgress: PropTypes.func.isRequired,
  updateInstance: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ onboardingProgress: state.instance.onboarding_progress });

export default connect(mapStateToProps, { /*updateOnboardingProgress*/updateInstance })(GSForm);