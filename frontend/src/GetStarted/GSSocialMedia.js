import React from 'react';
import instance from '../Instance/Instance';
import RadioToggle from '../RadioToggle/RadioToggle';
import { LinearProgress } from '@material-ui/core';

class GSSocialMedia extends React.Component {
  handleRadioChange = (data) => {
    if (!('onboarding_progress' in instance.data)) return;
    //TODO: Replace with call to internal progress func
    (data !== null) ? instance.data.onboarding_progress.social_media += 25 : instance.data.onboarding_progress.social_media -= 25;
  }

  handleFormChange = (data) => {
    if (!('onboarding_progress' in instance.data)) return;    
    //TODO: Replace with call to internal progress func
    (data !== null) ? instance.data.onboarding_progress.social_media += 25 : instance.data.onboarding_progress.social_media -= 25;
  }

  render() {
    return (
        <div style={{height: 400}}>
            <RadioToggle title="Do you already have a Facebook page?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have a Twitter account?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have an Instagram account?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have a YouTube channel?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <LinearProgress variant="determinate" value={instance.data.onboarding_progress['social_media']} />
        </div>
    )
  }
}

export default GSSocialMedia;