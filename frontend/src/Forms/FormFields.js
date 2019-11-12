const discordFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'discord_channel_url',
            label: 'Channel URL',
            validators: ['required', 'discordChannelURL'],
        },{
            type: 'radio',
            id: 'discord_channel_public',
            label: 'Is your Discord channel public, or for internal use only?',
            options: [
                {
                    label: 'Public',
                    value: 'true',
                },{
                    label: 'Internal Only',
                    value: 'false',
                }
            ],
            validators: ['required'],
        },
    ],
};
const facebookPageFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'facebook_page_url',
            label: 'Page URL',
            validators: ['required', 'facebookPageURL'],
        },
    ],
};

const flickrFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'flickr_username',
            label: 'Username',
            validators: ['required', 'notURL'],
        },
    ],
};

const gitHubFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'github_username',
            label: 'Username',
            validators: ['required', 'notURL'],
        },
    ],
};

const instagramFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'instagram_username',
            label: 'Username',
            validators: ['required', 'notURL'],
        },
    ],
};

const linkedInFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'linkedin_group_url',
            label: 'Group URL',
            validators: ['required', 'linkedInGroupURL'],
        },{
            type: 'radio',
            id: 'linkedin_group_public',
            label: 'Is your LinkedIn group public, or for internal use only?',
            options: [
                {
                    label: 'Public',
                    value: 'true',
                },{
                    label: 'Internal Only',
                    value: 'false',
                }
            ],
            validators: ['required'],
        },
    ],
};

const mediumFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'medium_profile_url',
            label: 'Profile URL',
            validators: ['required', 'atmarkUsername'],
        },
    ],
};

const messengerFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'messenger_group_chat_url',
            label: 'Group Chat URL',
            validators: ['required', 'MessengerGroupChatURL'],
        },{
            type: 'radio',
            id: 'messenger_group_chat_public',
            label: 'Is your Messenger group chat public, or for internal use only?',
            options: [
                {
                    label: 'Public',
                    value: 'true',
                },{
                    label: 'Internal Only',
                    value: 'false',
                }
            ],
            validators: ['required'],
        },
    ],
};

const meetupFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'meetup_group_url',
            label: 'Group URL',
            validators: ['required', 'meetupGroupURL'],
        },
    ],
};

const pinterestFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'pinterest_url',
            label: 'Pinterest URL',
            validators: ['required', 'pinterestURL'],
        },
    ],
};

const redditSubFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'reddit_sub_url',
            label: 'Subreddit URL',
            validators: ['required', 'redditSubURL'],
        },{
            type: 'radio',
            id: 'reddit_sub_public',
            label: 'Is your sub public, or for internal use only?',
            options: [
                {
                    label: 'Public',
                    value: 'true',
                },{
                    label: 'Internal Only',
                    value: 'false',
                }
            ],
            validators: ['required'],
        },
    ],
};

const slackWorkspaceFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'slack_workspace_url',
            label: 'Workspace URL',
            validators: ['required', 'slackWorkspaceURL'],
        },{
            type: 'radio',
            id: 'slack_workspace_public',
            label: 'Is your workspace public, or for internal use only?',
            options: [
                {
                    label: 'Public',
                    value: 'true',
                },{
                    label: 'Internal Only',
                    value: 'false',
                }
            ],
            validators: ['required'],
        },
    ],
};

const snapchatFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'snapchat_username',
            label: 'Username',
            validators: ['required', 'notURL'],
        },
    ],
};

const tumblrFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'tumblr_username',
            label: 'Username',
            validators: ['required', 'notURL'],
        },
    ],
};

const twitchFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'twitch_channel_url',
            label: 'Channel URL',
            validators: ['required', 'twitchChannelURL'],
        },
    ],
};

const twitterFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'twitter_username',
            label: 'Username (@Username)',
            validators: ['required', 'atmarkUsername'],
        },
    ],
};

const whatsAppChatFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'whatsapp_chat_url',
            label: 'Chat URL',
            validators: ['required', 'whatsAppChatURL'],
        },{
            type: 'radio',
            id: 'whatsapp_chat_public',
            label: 'Is your WhatsApp chat public, or for internal use only?',
            options: [
                {
                    label: 'Public',
                    value: 'true',
                },{
                    label: 'Internal Only',
                    value: 'false',
                }
            ],
            validators: ['required'],
        },
    ],
};

const youTubeFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'youtube_channel_url',
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