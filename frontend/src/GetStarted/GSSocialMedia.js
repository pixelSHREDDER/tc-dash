import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RadioToggle from '../RadioToggle/RadioToggle';
import { updateOnboardingProgress } from '../redux/actions/instanceActions';

class GSSocialMedia extends React.Component {
  handleRadioChange = (data) => {
    //this.props.updateOnboardingProgress(data);
    /*const { onboardingProgress } = this.props;

    //TODO: Replace with call to internal progress func
    (data !== null) ? (data === true) ? onboardingProgress.social_media += 12.5 : onboardingProgress.social_media += 25 : onboardingProgress.social_media -= 25;*/
  }

  handleFormChange = (data) => {
    const { onboardingProgress } = this.props;

    //TODO: Replace with call to internal progress func
    (data !== null) ? onboardingProgress.social_media += 12.5 : onboardingProgress.social_media -= 12.5;
  }

  render() {
    return (
        <React.Fragment>
            <RadioToggle title="Do you already have a Facebook page?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have a Twitter account?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have an Instagram account?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have a YouTube channel?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
        </React.Fragment>
    )
  }
}

GSSocialMedia.propTypes = {
  onboardingProgress: PropTypes.object.isRequired,
  updateOnboardingProgress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ onboardingProgress: state.instance.onboarding_progress });

export default connect(mapStateToProps, { updateOnboardingProgress })(GSSocialMedia);