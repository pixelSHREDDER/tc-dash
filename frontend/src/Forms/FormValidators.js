const FormValidators = {
    'noAtmarkUsername': data => data.toString().match(/^[^@]?(\w){1,50}$/) ? '' : 'That\'s not a valid username',
    'discordChannelURL': data => data.toString().match(/https:\/\/?(?:www.)?discord.gg\/(?:(?:\w)*#!\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Discord Channel URL',
    'email': data => data.toString().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : 'That\'s not a valid email address',
    'facebookPageURL': data => data.toString().match(/https:\/\/?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Facebook Page URL',
    'flickrUsername': data => {
        const d = data.toString();
        if (!(d.match(/^((?!http|www|.com|.net|.org|.gov|.edu).)*$/))) return 'Don\'t use a link here';
        return d.match(/^[^@]?(\w){1,50}$/) ? '' : 'Don\'t include the @';
    },
    'gitHubUsername': data => {
        const d = data.toString();
        if (d.length > 39) return 'GitHub usernames are 39 characters or less';
        if (!(d.match(/^((?!http|www|.com|.net|.org|.gov|.edu).)*$/))) return 'Don\'t use a link here';
        return d.match(/^[^@]?(\w){1,39}$/) ? '' : 'Don\'t include the @';
    },
    'iframe': data => data.toString().match(/(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/) ? '' : 'That\'s not what we\'re looking for',
    'instagramUsername': data => {
        const d = data.toString();
        if (d.length > 30) return 'Instagram usernames are 30 characters or less';
        if (!(d.match(/^((?!http|www|.com|.net|.org|.gov|.edu).)*$/))) return 'Don\'t use a link here';
        return d.match(/^[^@]?(\w){1,30}$/) ? '' : 'Don\'t include the @';
    },
    'linkedInGroupURL': data => data.toString().match(/https:\/\/?(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:groups\/)?([\w-]*)?/) ? '' : 'That\'s not a valid LinkedIn Group URL',
    'mediumProfileURL': data => data.toString().match(/https:\/\/?medium.com\/(?:(?:\w)*#!\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Medium profile URL',
    'meetupGroupURL': data => data.toString().match(/https:\/\/?(?:www.)?meetup.com\/(?:(?:\w)*#!\/)?(?:channel\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Meetup group URL',
    'phone': data => data.toString().match(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/) ? '' : 'That\'s not a valid phone number',
    'redditSubURL': data => data.toString().match(/https:\/\/?(?:www.)?reddit.com\/(?:(?:\w)*#!\/)?(?:r\/)?([\w-]*)?/) ? '' : 'That\'s not a valid subreddit URL',
    'required': data => data.length ? '' : 'This field is required',
    'slackWorkspaceURL': data => data.toString().match(/(?:(?:[\w-])*\.)*slack\.com/) ? '' : 'That\'s not a valid Slack workspace URL',
    'snapchatUsername': data => {
        const d = data.toString();
        if (d.length > 15) return 'Snapchat usernames are 15 characters or less';
        if (!(d.match(/^((?!http|www|.com|.net|.org|.gov|.edu).)*$/))) return 'Don\'t use a link here';
        return d.match(/^[^@]?(\w){1,15}$/) ? '' : 'Don\'t include the @';
    },
    'tumblrUsername': data => {
        const d = data.toString();
        if (d.length > 32) return 'Tumblr usernames are 15 characters or less';
        if (!(d.match(/^((?!http|www|.com|.net|.org|.gov|.edu).)*$/))) return 'Don\'t use a link here';
        return d.match(/^[^@]?(\w){1,32}$/) ? '' : 'Don\'t include the @';
    },
    'twitchChannelURL': data => data.toString().match(/https:\/\/?(?:www.)?twitch.tv\/(?:(?:\w)*#!\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Twitch channel URL',
    'twitterUsername': data => {
        const d = data.toString();
        if (d.length > 15) return 'Twitter usernames are 15 characters or less';
        if (!(d.match(/^((?!http|www|.com|.net|.org|.gov|.edu).)*$/))) return 'Don\'t use a link here';
        return d.match(/^[^@]?(\w){1,15}$/) ? '' : 'Don\'t include the @';
    },
    'url': data => data.toString().match(/^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/) ? '' : 'That\'s not a valid URL',
    'whatsAppChatURL': data => data.toString().match(/https:\/\/?chat.whatsapp.com\/(?:\w)*/) ? '' : 'That\'s not a valid WhatsApp chat URL',
    'youTubeChannelURL': data => data.toString().match(/https:\/\/?(?:www.)?youtube.com\/(?:(?:\w)*#!\/)?(?:channel\/)?([\w-]*)?/) ? '' : 'That\'s not a valid YouTube channel URL',
    'zip': data => data.toString().match(/^\d{5}(-\d{4})?$/) ? '' : 'That\'s not a valid zipcode',
};
export default FormValidators;