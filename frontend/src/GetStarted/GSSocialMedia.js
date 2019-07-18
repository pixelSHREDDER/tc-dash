import React from 'react';
import RadioToggle from '../RadioToggle/RadioToggle';
import { LinearProgress } from '@material-ui/core';

class GSSocialMedia extends React.Component {
  state = {
    instance: {}
  }

  handleRadioChange = (data) => {
    let instance = this.state.instance;
    if (!('onboarding_progress' in instance)) return;
    (data !== null) ? instance.onboarding_progress.social_media += 25 : instance.onboarding_progress.social_media -= 25;
    this.setState({instance});
  }

  handleFormChange = (data) => {
    let instance = this.state.instance;
    if (!('onboarding_progress' in instance)) return;    
    (data !== null) ? instance.onboarding_progress.social_media += 25 : instance.onboarding_progress.social_media -= 25;
    this.setState({instance});
  }

  render() {
    const { instance } = this.props;
    if (instance === null) return <p>Loading ...</p>;

    return (
        <div style={{height: 400}}>
            <RadioToggle title="Do you already have a Facebook page?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have a Twitter account?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have an Instagram account?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <RadioToggle title="Do you already have a YouTube channel?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} />
            <LinearProgress variant="determinate" value={instance.onboarding_progress['social_media']} />
        </div>
    )
  }
}

export default GSSocialMedia;