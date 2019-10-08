const discordFormFields = {
    'existing': [
        {
            type: 'text',
            id: 'discord_channel_url',
            label: 'Channel URL',
            validators: ['required', 'discordChannelURL'],
        },{
            type: 'radio',
            id: 'discord_public',
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
    mediumFormFields,
    meetupFormFields,
    pinterestFormFields,
    snapchatFormFields,
    tumblrFormFields,
    twitchFormFields,
    twitterFormFields,
    youTubeFormFields,
};