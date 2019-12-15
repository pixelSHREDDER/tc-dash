const FormValidators = {
    'atmarkUsername': data => data.toString().match(/^(?:@).*$/) ? '' : 'That\'s not a valid username',
    'discordChannelURL': data => data.toString().match(/https:\/\/?(?:www.)?discord.gg\/(?:(?:\w)*#!\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Discord Channel URL',
    'email': data => data.toString().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : 'That\'s not a valid email address',
    'facebookPageURL': data => data.toString().match(/https:\/\/?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Facebook Page URL',
    'linkedInGroupURL': data => data.toString().match(/https:\/\/?(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:groups\/)?([\w-]*)?/) ? '' : 'That\'s not a valid LinkedIn Group URL',
    'meetupGroupURL': data => data.toString().match(/https:\/\/?(?:www.)?meetup.com\/(?:(?:\w)*#!\/)?(?:channel\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Meetup group URL',
    'notURL': data => data.toString().match(/^((?!http|www|.com|.net|.org|.gov|.edu).)*$/) ? '' : 'Please don\'t use a link here',
    'phone': data => data.toString().match(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/) ? '' : 'That\'s not a valid phone number',
    'redditSubURL': data => data.toString().match(/https:\/\/?(?:www.)?reddit.com\/(?:(?:\w)*#!\/)?(?:r\/)?([\w-]*)?/) ? '' : 'That\'s not a valid subreddit URL',
    'required': data => data.length ? '' : 'This field is required',
    'slackWorkspaceURL': data => data.toString().match(/(?:(?:[\w-])*\.)*slack\.com/) ? '' : 'That\'s not a valid Slack workspace URL',
    'twitchChannelURL': data => data.toString().match(/https:\/\/?(?:www.)?twitch.tv\/(?:(?:\w)*#!\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Twitch channel URL',
    'url': data => data.toString().match(/^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/) ? '' : 'That\'s not a valid URL',
    'whatsAppChatURL': data => data.toString().match(/https:\/\/?chat.whatsapp.com\/(?:\w)*/) ? '' : 'That\'s not a valid WhatsApp chat URL',
    'youTubeChannelURL': data => data.toString().match(/https:\/\/?(?:www.)?youtube.com\/(?:(?:\w)*#!\/)?(?:channel\/)?([\w-]*)?/) ? '' : 'That\'s not a valid YouTube channel URL',
    'zip': data => data.toString().match(/^\d{5}(-\d{4})?$/) ? '' : 'That\'s not a valid zipcode',
};
export default FormValidators;