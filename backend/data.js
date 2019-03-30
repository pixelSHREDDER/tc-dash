const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let typeValidation = {
  values: ['county', 'college', 'high_school', 'parent', 'demo', 'stage'],
  message: 'Not a valid instance type'
};

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

function pwpushValidator(v) {
  let re = new RegExp('^https:\/\/pwpush\.com\/p\/.*$');
  return re.test(v);
};

function emailValidator(v) {
  let re = new RegExp('^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$');
  return re.test(v);
};

function twitterValidator(v) {
  let re = new RegExp('^@?(\w){1,15}$');
  return re.test(v);
};

function requiredArrayLengthValidator(v) {
  return v.length > 0;
}

function iframeValidator(v) {
  let re = new RegExp('^(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))$');
  return re.test(v);
};

function hexValidator (v) {
  if (v.indexOf('#') == 0) {
      if (v.length == 7) {  // #f0f0f0
          return true;
      } else if (v.length == 4) {  // #fff
          return true;
      }
  }
  return false;
};

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
    type: {
      type: String,
      enum: typeValidation,
    },
    mailing_address: {
      line_1: String,
      line_2: String,
      city: String,
      state: {
        type: String,
        uppercase: true,
        minlength: [2, 'Not a valid state'],
        maxlength: [2, 'Not a valid state'],
      },
      zip: {
        type: String,
        minlength: [5, 'Not a valid zipcode'],
        maxlength: [10, 'Not a valid zipcode'],
        validate: [zipValidator, 'Not a valid zipcode'],
      },
      phone: {
        type: String,
        minlength: [12, 'Not a valid phone number'],
        maxlength: [12, 'Not a valid phone number'],
        validate: [phoneValidator, 'Not a valid phone number'],
      },
    },
    old_website: {
      url: {
        type: String,
        validate: [urlValidator, 'Not a valid URL'],
      },
      hosting_provider: String,
      hosting_username: String,
      pwpush_url: {
        type: String,
        validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
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
        email_address: {
          type: String,
          validate: [emailValidator, 'Not a valid email address'],
        },
        forwarding_to: String,
        email_pwpush_url: {
          type: String,
          validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
        },
      }],
    },
    mailchimp: {
      username: String,
      pwpush_url: {
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
    social_media: {
      facebook: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
        optimize: Boolean,
      },
      twitter: {
        username: {
          type: String,
          validate: [twitterValidator, 'Not a valid Twitter username'],
        },
        optimize: Boolean,
        optimize_info: {
          email_address: {
            type: String,
            validate: [emailValidator, 'Not a valid email address'],
          },
          pwpush_url: {
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
        username_choices: {
          type: [{
            type: String,
            validate: [twitterValidator, 'Not a valid Twitter username'],
          }],
          validate: [choicesValidator, 'Please include at least 3 {PATH}s'],
        },
      },
      discord: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
        access_levels: {
          type: [{
            type: String,
          }],
          validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
        },
      },
      flickr: {
        username: String,
      },
      github: {
        username: String,
      },
      instagram: {
        username: String,
      },
      linkedin: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
        access_levels: {
          type: [{
            type: String,
          }],
          validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
        },
      },
      meetup: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
      },
      medium: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
      },
      messenger: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
        access_levels: {
          type: [{
            type: String,
          }],
          validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
        },
      },
      pinterest: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
      },
      reddit: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
        access_levels: {
          type: [{
            type: String,
          }],
          validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
        },
      },
      slack: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
        access_levels: {
          type: [{
            type: String,
          }],
          validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
        },
      },
      snapchat: {
        username: String,
      },
      tumblr: {
        username: String,
      },
      twitch: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
      },
      whatsapp: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
        access_levels: {
          type: [{
            type: String,
          }],
          validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
        },
      },
      youtube: {
        url: {
          type: String,
          validate: [urlValidator, 'Not a valid URL'],
        },
      },
      other: {
        type: [{
          name: {
            type: String,
          },
          url: {
            type: String,
            validate: [urlValidator, 'Not a valid URL'],
          },
          access_levels: {
            type: [{
              type: String,
            }],
            validate: [requiredArrayLengthValidator, 'Please select one or more {PATH}'],
          },
        }],
      },
    },
    paypal: {
      email_address: {
        type: String,
        validate: [emailValidator, 'Not a valid email address'],
      },
      pwpush_url: {
        type: String,
        validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
      },
      two_factor: {
        name: {
          type: String,
        },
        email_address: {
          type: String,
          validate: [emailValidator, 'Not a valid email address'],
        },
        linked_to_bank: Boolean,
      },
    },
    google_analytics: {
      email_address: {
        type: String,
        validate: [emailValidator, 'Not a valid email address'],
      },
      pwpush_url: {
        type: String,
        validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
      },
      two_factor: {
        name: {
          type: String,
        },
        email_address: {
          type: String,
          validate: [emailValidator, 'Not a valid email address'],
        },
        linked_to_bank: Boolean,
      },
    },
    google_search_console: {
      email_address: {
        type: String,
        validate: [emailValidator, 'Not a valid email address'],
      },
      pwpush_url: {
        type: String,
        validate: [pwpushValidator, 'Not a valid PasswordPusher link'],
      },
      two_factor: {
        name: {
          type: String,
        },
        email_address: {
          type: String,
          validate: [emailValidator, 'Not a valid email address'],
        },
        linked_to_bank: Boolean,
      },
    },
    podcast: {
      anchor: Boolean,
      url: {
        type: String,
        validate: [urlValidator, 'Not a valid URL'],
      },
      embed: {
        type: String,
        validate: [iframeValidator, 'Not a valid embed code'],
      },
    },
    bylaws: {
      type: String,
      validate: [urlValidator, 'Not a valid URL'],
    },
    branding: [{
      type: String,
      validate: [urlValidator, 'Not a valid URL'],
    }],
    primary_color: {
      type: String,
      validate: [hexValidator, 'Not a valid color']
    },
    secondary_color: {
      type: String,
      validate: [hexValidator, 'Not a valid color']
    },
    tertiary_color: {
      type: String,
      validate: [hexValidator, 'Not a valid color']
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