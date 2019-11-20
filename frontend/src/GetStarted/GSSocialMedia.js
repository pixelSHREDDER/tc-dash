import React from 'react';
import GSForm from '../Forms/GSForm';
import {
  discordFormFields,
  facebookPageFormFields,
  flickrFormFields,
  gitHubFormFields,
  instagramFormFields,
  linkedInFormFields,
  mediumFormFields,
  messengerFormFields,
  meetupFormFields,
  pinterestFormFields,
  redditSubFormFields,
  slackWorkspaceFormFields,
  snapchatFormFields,
  tumblrFormFields,
  twitchFormFields,
  twitterFormFields,
  whatsAppChatFormFields,
  youTubeFormFields
} from '../SocialMedia/SocialMediaFormFields';

const questionGroups = [
  {
    title: 'The Big Ones',
    questions: [
      {
        type: 'radioToggle',
        title: 'Do you already have a Facebook Page?',
        description: 'We\'ll set one up for you if you don\'t!',
        fields: facebookPageFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you already have a Twitter account?',
        description: 'We\'ll set one up for you if you don\'t!',
        fields: twitterFormFields.existing,
      },
    ],
  },
  {
    title: 'Photos',
    questions: [
      {
        type: 'radioToggle',
        title: 'Do you have an Instagram account?',
        fields: instagramFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Snapchat account?',
        fields: snapchatFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Pinterest account?',
        fields: pinterestFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Flickr account?',
        fields: flickrFormFields.existing,
      },
    ],
  },
  {
    title: 'Video',
    questions: [
      {
        type: 'radioToggle',
        title: 'Do you have a YouTube channel?',
        fields: youTubeFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Twitch channel?',
        fields: twitchFormFields.existing,
      },
    ],
  },
  {
    title: 'Chatting',
    questions: [
      {
        type: 'radioToggle',
        title: 'Do you have a Discord channel?',
        fields: discordFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Messenger group chat?',
        fields: messengerFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Slack workspace?',
        fields: slackWorkspaceFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a WhatsApp chat?',
        fields: whatsAppChatFormFields.existing,
      },
    ],
  },
  {
    title: 'Blogging',
    questions: [
      {
        type: 'radioToggle',
        title: 'Do you have a Medium blog?',
        fields: mediumFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Tumblr blog?',
        fields: tumblrFormFields.existing,
      },
    ],
  },
  {
    title: 'Misc.',
    questions: [
      {
        type: 'radioToggle',
        title: 'Do you have an GitHub account?',
        fields: gitHubFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a LinkedIn group?',
        fields: linkedInFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Meetup group?',
        fields: meetupFormFields.existing,
      },
      {
        type: 'radioToggle',
        title: 'Do you have a Reddit sub?',
        fields: redditSubFormFields.existing,
      },
    ],
  },
];

class GSSocialMedia extends React.Component {
  render = () => <GSForm questionGroups={questionGroups} />;
}

export default GSSocialMedia;