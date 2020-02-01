import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormRenderer from '../Forms/FormRenderer';
import { updateOnboardingProgress } from '../redux/actions/instanceActions';

class GSForm extends React.Component {
  handleRadioChange = (data) => {
    //console.log(data.hasFollowups);
    //this.props.updateOnboardingProgress(data);
    const { onboardingProgress } = this.props;

    //TODO: Replace with call to internal progress func
    //console.log(data);
    (data.value !== null) ? (data.fieldCount ? onboardingProgress.socialMedia += 2.7777777778 : onboardingProgress.socialMedia += 5.5555555556) : onboardingProgress.socialMedia -= 5.5555555556;
    console.log(onboardingProgress.socialMedia);
  }

  handleInputChange = (data) => {
    const { onboardingProgress } = this.props;
    console.log(data);
    //TODO: Replace with call to internal progress func
    (data.value !== null) ? onboardingProgress.socialMedia += (2.7777777778 / data.fieldCount) : onboardingProgress.socialMedia -= (2.7777777778 / data.fieldCount);
  }

  render() {
    const { blurb, questionGroups } = this.props;

    return (
        <FormRenderer
            blurb={blurb}    
            questionGroups={questionGroups}
            radioChangeCallback={(data) => this.handleRadioChange(data)}
            inputChangeCallback={(data) => this.handleInputChange(data)}
        />
    )
  }
}

GSForm.propTypes = {
    blurb: PropTypes.object,
    questionGroups: PropTypes.array.isRequired,
    onboardingProgress: PropTypes.object.isRequired,
    updateOnboardingProgress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ onboardingProgress: state.instance.onboarding_progress });

export default connect(mapStateToProps, { updateOnboardingProgress })(GSForm);