import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  discordFormFields,
  facebookPageFormFields,
  flickrFormFields,
  gitHubFormFields,
  instagramFormFields,
  mediumFormFields,
  meetupFormFields,
  pinterestFormFields,
  snapchatFormFields,
  tumblrFormFields,
  twitchFormFields,
  twitterFormFields,
  youTubeFormFields
} from '../Forms/FormFields';
import RadioToggle from '../RadioToggle/RadioToggle';
import { updateOnboardingProgress } from '../redux/actions/instanceActions';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
});

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
    const { classes } = this.props;

    return (
        <React.Fragment>
          <Paper className={classes.root}>
            <Typography variant="h6" component="h2" gutterBottom>The Big Ones</Typography>
            <RadioToggle title="Do you already have a Facebook Page?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={facebookPageFormFields.existing} />
            <RadioToggle title="Do you already have a Twitter account?" description="We'll set one up for you if you don't!" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={twitterFormFields.existing} />
            <Typography variant="h6" component="h2" gutterBottom>Photos</Typography>
            <RadioToggle title="Do you have an Instagram account?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={instagramFormFields.existing} />
            <Typography variant="h6" component="h2" gutterBottom>Video</Typography>
            <RadioToggle title="Do you have a YouTube channel?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={youTubeFormFields.existing} />
            <RadioToggle title="Do you have a Twitch channel?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={twitchFormFields.existing} />
            <RadioToggle title="Do you have a Flickr account?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={flickrFormFields.existing} />
            <RadioToggle title="Do you have a Discord channel?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={discordFormFields.existing} />
            <RadioToggle title="Do you have a Meetup group?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={meetupFormFields.existing} />
            <RadioToggle title="Do you have a Medium account?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={mediumFormFields.existing} />
            <RadioToggle title="Do you have a Pinterest account?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={pinterestFormFields.existing} />
            <RadioToggle title="Do you have a Snapchat account?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={snapchatFormFields.existing} />
            <RadioToggle title="Do you have a Tumblr account?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={tumblrFormFields.existing} />
            <RadioToggle title="Do you have a GitHub account?" radioChangeCallback={(data) => this.handleRadioChange(data)} formChangeCallback={(data) => this.handleFormChange(data)} fields={gitHubFormFields.existing} />
        </Paper>
        </React.Fragment>
    )
  }
}

GSSocialMedia.propTypes = {
  onboardingProgress: PropTypes.object.isRequired,
  updateOnboardingProgress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ onboardingProgress: state.instance.onboarding_progress });

export default connect(mapStateToProps, { updateOnboardingProgress })(withStyles(styles, { withTheme: true })(GSSocialMedia));