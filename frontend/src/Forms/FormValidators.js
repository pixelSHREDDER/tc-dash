const FormValidators = {
    'atmarkUsername': data => data.toString().match(/^(?:@).*$/) ? '' : 'That\'s not a valid username',
    'facebookPageURL': data => data.toString().match(/https:\/\/?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Facebook Page URL',
    'meetupGroupURL': data => data.toString().match(/https:\/\/?(?:www.)?meetup.com\/(?:(?:\w)*#!\/)?(?:channel\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Meetup group URL',
    'notURL': data => data.toString().match(/^((?!http|www|.com|.net|.org|.gov|.edu).)*$/) ? '' : 'Please don\'t use a link here',
    'required': data => data.length ? '' : 'This field is required',
    'twitchChannelURL': data => data.toString().match(/https:\/\/?(?:www.)?twitch.tv\/(?:(?:\w)*#!\/)?([\w-]*)?/) ? '' : 'That\'s not a valid Twitch channel URL',
    'youTubeChannelURL': data => data.toString().match(/https:\/\/?(?:www.)?youtube.com\/(?:(?:\w)*#!\/)?(?:channel\/)?([\w-]*)?/) ? '' : 'That\'s not a valid YouTube channel URL',
};
export default FormValidators;