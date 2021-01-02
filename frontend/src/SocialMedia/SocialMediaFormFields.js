import {
    getIsPublicFormFields,
    getTwoFactorFormFields,
} from '../Forms/FormFieldGenerators';

const discordFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'discord_channel_url',
            label: 'Channel URL',
            validators: ['required', 'discordChannelURL'],
        },
        ...getIsPublicFormFields('discord_channel', 'Discord channel'),
    ],
};
const facebookPageFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'facebook_page_url',
            label: 'Page URL',
            validators: ['required', 'facebookPageURL'],
        },
    ],
};

const flickrFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'flickr_username',
            label: 'Username',
            validators: ['required', 'flickrUsername'],
        },
    ],
};

const gitHubFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'github_username',
            label: 'Username',
            validators: ['required', 'gitHubUsername'],
        },
    ],
};

const instagramFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'instagram_username',
            label: 'Username',
            validators: ['required', 'instagramUsername'],
        },
    ],
};

const linkedInFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'linkedin_group_url',
            label: 'Group URL',
            validators: ['required', 'linkedInGroupURL'],
        },
        ...getIsPublicFormFields('linkedin_group', 'LinkedIn group'),
    ],
};

const mediumFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'medium_profile_url',
            label: 'Profile URL',
            validators: ['required', 'mediumProfileURL'],
        },
    ],
};

const messengerFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'messenger_group_chat_url',
            label: 'Group Chat URL',
            validators: ['required', 'MessengerGroupChatURL'],
        },
        ...getIsPublicFormFields('messenger_group_chat', 'Messenger group chat'),
    ],
};

const meetupFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'meetup_group_url',
            label: 'Group URL',
            validators: ['required', 'meetupGroupURL'],
        },
    ],
};

const pinterestFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'pinterest_url',
            label: 'Pinterest URL',
            validators: ['required', 'pinterestURL'],
        },
    ],
};

const redditSubFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'reddit_sub_url',
            label: 'Subreddit URL',
            validators: ['required', 'redditSubURL'],
        },
        ...getIsPublicFormFields('reddit_sub', 'subreddit'),
    ],
};

const slackWorkspaceFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'slack_workspace_url',
            label: 'Workspace URL',
            validators: ['required', 'slackWorkspaceURL'],
        },
        ...getIsPublicFormFields('slack_workspace', 'workspace'),
    ],
};

const snapchatFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'snapchat_username',
            label: 'Username',
            validators: ['required', 'snapchatUsername'],
        },
    ],
};

const tumblrFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'tumblr_username',
            label: 'Username',
            validators: ['required', 'tumblrUsername'],
        },
    ],
};

const twitchFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'twitch_channel_url',
            label: 'Channel URL',
            validators: ['required', 'twitchChannelURL'],
        },
    ],
};

const twitterFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'twitter_username',
            label: 'Username (@Username)',
            validators: ['required', 'twitterUsername'],
        },{
            type: 'password',
            name: 'twitter_password',
            label: 'Password',
            validators: ['required'],
        },
        ...getTwoFactorFormFields('twitter'),
    ],
};

const whatsAppChatFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'whatsapp_chat_url',
            label: 'Chat URL',
            validators: ['required', 'whatsAppChatURL'],
        },
        ...getIsPublicFormFields('whatsapp_chat', 'WhatsApp chat'),
    ],
};

const youTubeFormFields = {
    'existing': [
        {
            type: 'text',
            name: 'youtube_channel_url',
            label: 'Channel URL',
            validators: ['required', 'youTubeChannelURL'],
        },
    ],
};

export {
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
    youTubeFormFields,
};