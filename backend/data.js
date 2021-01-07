const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

function domainValidator(v) {
  //let re = new RegExp('^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$');
  let re = new RegExp('^[a-zA-Z0-9\-\.]+\.org$');
  return re.test(v);
};

function choicesValidator(v) {
  return v.length >= 3;
}

/*let zipValidators = [
  { validator: isNotTooShort, msg: 'Is too short' },
  { validator: onlyLettersAllow, msg: 'Only Letters' }
];*/

function zipValidator (v) {
  let re = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
  //return (v == null || v.trim().length < 1) || re.test(v);
  return re.test(v);
};

function phoneValidator(v) {
  let re = new RegExp('^[2-9]\d{2}-\d{3}-\d{4}$');
  return re.test(v);
};

function urlValidator(v) {
  let re = new RegExp('^(((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$');
  return re.test(v);
};

function notUrlValidator(v) {
  let re = new RegExp('^(((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$');
  return !re.test(v);
};

function pwpushValidator(v) {
  let re = new RegExp('^https:\/\/pwpush\.com\/p\/.*$');
  return re.test(v);
};

function emailValidator(v) {
  let re = new RegExp('^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$');
  return re.test(v);
};

function noAtmarkValidator(v) {
  let re = new RegExp('^[^@]?(\w){1,50}$');
  return re.test(v);
};

function noHashtagValidator(v) {
  let re = new RegExp('^[^#]?(\w){1,7}$');
  return re.test(v);
};

function noLeadingOrTrailingSlashesValidator(v) {
  let re = new RegExp('/^\/|\/$/');
  return !re.test(v);
};

function requiredArrayLengthValidator(v) {
  return v.length > 0;
}

function iframeValidator(v) {
  let re = new RegExp('^(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))$');
  return re.test(v);
};

const usernameValidators = [
  { validator: noAtmarkValidator, msg: 'Don\'t include the @' },
  { validator: notUrlValidator, msg: 'Don\'t pass the full URL' },
];

const urlSubValidators = [
  { validator: noLeadingOrTrailingSlashesValidator, msg: 'Don\'t include the slashes at the beginning or the end' },
  { validator: notUrlValidator, msg: 'Don\'t pass the full URL' },
];

let InstanceSchema = new Schema(
  {
    owner: {
      type: String,
      unique: true,
    },
    domain: {
      type: String,
      unique: true,
      validate: [domainValidator, 'Not a valid domain'],
    },
    title: String,
    description: String,
    instance_type: {
      type: Number,
        min: [0, 'Not a valid instance type'],
        max: [6, 'Not a valid instance type'],
    },
    mailing_address_line_1: String,
    mailing_address_line_2: String,
    mailing_address_city: String,
    mailing_address_state: {
      type: String,
      uppercase: true,
      minlength: [2, 'Not a valid state'],
      maxlength: [2, 'Not a valid state'],
    },
    mailing_address_zip: {
      type: String,
      minlength: [5, 'Not a valid zipcode'],
      maxlength: [10, 'Not a valid zipcode'],
      validate: [zipValidator, 'Not a valid zipcode'],
    },
    phone_number: {
      type: String,
      minlength: [12, 'Not a valid phone number'],
      maxlength: [12, 'Not a valid phone number'],
      validate: [phoneValidator, 'Not a valid phone number'],
    },
    old_website: {
      url: {
        type: String,
        validate: [urlValidator, 'Not a valid URL'],
      },
      admin_username: String,
      admin_pwpush_id: {
        type: String,
        validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
      },
      hosting_provider: String,
      hosting_username: String,
      hosting_pwpush_id: {
        type: String,
        validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
      },
      hosting_2fa_name: String,
      hosting_2fa_email_address: {
        type: String,
        validate: [emailValidator, 'Not a valid email address'],
      },
    },
    domain_choices: {
      type: [{
        type: String,
        validate: [domainValidator, 'Not a valid domain'],
      }],
      validate: [choicesValidator, 'Please include at least 3 {PATH}s'],
    },
    /*board_tiers: {
      type: [{
        type: [{
          type: String,
        }],
      }],
    },*/
    board: Schema.Types.ObjectId,
    old_emails: {
      type: [{
        old_email_pwpush_id: {
          type: String,
          validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
        },
        old_email_forwarding_position: String,
        old_email_2fa_name: String,
        old_email_2fa_email_address: {
          type: String,
          validate: [emailValidator, 'Not a valid email address'],
        },
      }],
    },
    mailchimp: {
      username: String,
      pwpush_id: {
        type: String,
        validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
      },
      two_factor: {
        name: String,
        email_address: {
          type: String,
          validate: [emailValidator, 'Not a valid email address'],
        },
      },
    },
    facebook_page_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    twitter_username: {
      type: String,
      maxlength: [15, 'Twitter usernames are 15 characters or less'],
      validate: usernameValidators,
    },
    twitter_pwpush_id: {
      type: String,
      validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
    },
    twitter_2fa_name: String,
    twitter_2fa_email_address: {
      type: String,
      validate: [emailValidator, 'Not a valid email address'],
    },
    discord_channel_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    discord_channel_public: Boolean,
    /*discord_channel_access_levels: {
      type: [{
        type: String,
      }],
      validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
    },*/
    flickr_username: {
      type: String,
      validate: usernameValidators,
    },
    github_username: {
      type: String,
      maxlength: [39, 'GitHub usernames are 39 characters or less'],
      validate: usernameValidators,
    },
    instagram_username: {
      type: String,
      maxlength: [30, 'Instagram usernames are 30 characters or less'],
      validate: usernameValidators,
    },
    linkedin_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    linkedin_public: Boolean,
    /*linkedin_access_levels: {
      type: [{
        type: String,
      }],
      validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
    },*/
    meetup_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    medium_profile_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    messenger_group_chat_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    messenger_group_chat_public: Boolean,
    /*messenger_group_chat_access_levels: {
      type: [{
        type: String,
      }],
      validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
    },*/
    pinterest_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    reddit_sub_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    reddit_sub_public: Boolean,
    /*reddit_sub_access_levels: {
      type: [{
        type: String,
      }],
      validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
    },*/
    slack_workspace_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    slack_workspace_public: Boolean,
    /*slack_workspace_access_levels: {
      type: [{
        type: String,
      }],
      validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
    },*/
    snapchat_username: {
      type: String,
      maxlength: [15, 'Snapchat usernames are 15 characters or less'],
      validate: usernameValidators,
    },
    tumblr_username: {
      type: String,
      maxlength: [32, 'Tumblr usernames are 32 characters or less'],
      validate: usernameValidators,
    },
    twitch_channel_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    whatsapp_chat_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    whatsapp_chat_public: Boolean,
    /*whatsapp_chat_access_levels: {
      type: [{
        type: String,
      }],
      validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
    },*/
    youtube_channel_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    other_social: {
      type: [{
        name: {
          type: String,
        },
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
        public: Boolean,
        /*access_levels: {
          type: [{
            type: String,
          }],
          validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
        },*/
      }],
    },
    paypal_email_address: {
      type: String,
      validate: [emailValidator, 'Not a valid email address'],
    },
    paypal_pwpush_id: {
      type: String,
      validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
    },
    paypal_2fa_name: {
        type: String,
    },
    paypal_2fa_email_address: {
      type: String,
      validate: [emailValidator, 'Not a valid email address'],
    },
    paypal_bank_linked: Boolean,
    google_analytics_email_address: {
      type: String,
      validate: [emailValidator, 'Not a valid email address'],
    },
    google_analytics_pwpush_id: {
      type: String,
      validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
    },
    google_analytics_2fa_name: {
      type: String,
    },
    google_analytics_2fa_email_address: {
      type: String,
      validate: [emailValidator, 'Not a valid email address'],
    },
    google_search_console_email_address: {
      type: String,
      validate: [emailValidator, 'Not a valid email address'],
    },
    google_search_console_pwpush_id: {
      type: String,
      validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
    },
    google_search_console_2fa_name: {
      type: String,
    },
    google_search_console_2fa_email_address: {
      type: String,
      validate: [emailValidator, 'Not a valid email address'],
    },
    podcast_anchor_url_sub: {
      type: String,
      validate: urlSubValidators,
    },
    podcast_embed_code: {
      type: String,
      validate: [iframeValidator, 'Not a valid embed code'],
    },
    bylaws_constitution: {
      type: String,
      validate: [urlValidator, 'Not a valid URL'],
    },
    primary_color: {
      type: String,
      minlength: [6, 'Hex colors are 6 digits long'],
      maxlength: [6, 'Hex colors are 6 digits long'],
      validate: [noHashtagValidator, 'Don\'t include the #'],
    },
    secondary_color: {
      type: String,
      minlength: [6, 'Hex colors are 6 digits long'],
      maxlength: [6, 'Hex colors are 6 digits long'],
      validate: [noHashtagValidator, 'Don\'t include the #'],
    },
    tertiary_color: {
      type: String,
      minlength: [6, 'Hex colors are 6 digits long'],
      maxlength: [6, 'Hex colors are 6 digits long'],
      validate: [noHashtagValidator, 'Don\'t include the #'],
    },
    icon: {
      type: String,
    },
    website_logo: {
      type: String,
    },
    website_mobile_logo: {
      type: String,
    },
    paypal_invoice_logo: {
      type: String,
    },
    paypal_payment_logo: {
      type: String,
    },
    website_welcome_post_image: {
      type: String,
    },
    onboarding_progress: {
      organization_info: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      website: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      board: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      email: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      social_media: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      payments_finances: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      analytics_seo: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      podcasting: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      bylaws_constitution: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
      branding_personalization: {
        type: Number,
        min: [0, 'Progress too low'],
        max: [100, 'Progress too high'],
      },
    },
  },
  { timestamps: true }
);

/*let BoardPositionSchema = new Schema(
  {
    tier: Number,
    title: {
      type: String,
    },
    titleholder_name: {
      prefix: {
        type: String,
      },
      first_name: {
        type: String,
      },
      middle_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      suffix: {
        type: String,
      },
    },
    email: {
      type: String,
      validate: [emailValidator, 'Not a valid email address'],
    },
    does_finances: {
      type: Boolean,
      unique: true,
    },
    does_comms: {
      type: Boolean,
      unique: true,
    },
  },
);*/

InstanceSchema.plugin(uniqueValidator, { message: 'Sorry, that {PATH} is already taken!' });

module.exports = mongoose.model("Data", InstanceSchema);