const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const logger = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const Config = require('./configuration.json');
const Data = require('./data');

const env = Config.env;
const API_PORT = Config.apiPort[env];
const app = express();
app.use(helmet());
app.use(cors());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${Config.auth0[env].domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: Config.auth0[env].audience,
  issuer: `https://${Config.auth0[env].domain}/`,
  algorithms: ['RS256']
});

const router = express.Router();

// this is our MongoDB database
const dbRoute = Config.dbRoute[env];

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize({
    replaceWith: '_-_'
  }))
app.use(logger('dev'));

const desanitizeURLs = obj => {  
  //TODO: Refactor this bruteforced nonsense, integrate with express get function's foreach or something
  obj.forEach((val, key) => {
    console.log(key);
    console.log(val);
    if (key === 'domain') obj[key] = obj[key].replace('_-_', '.');
    else if (key === 'domain_choices') obj[key].forEach((dVal, dKey) => obj[key][dKey] = dVal.replace('_-_', '.'));
    else if (key === 'podcast') {
      if ('url' in obj[key]) obj[key]['url'] = obj[key]['url'].replace('_-_', '.');
      if ('embed' in obj[key]) obj[key]['embed'] = obj[key]['embed'].replace('_-_', '.');
    } else if (key === 'old_website') {
      if ('url' in obj[key]) obj[key]['url'] = obj[key]['url'].replace('_-_', '.');
      if ('pwpush_url' in obj[key]) obj[key]['pwpush_url'] = obj[key]['pwpush_url'].replace('_-_', '.');
    } else if (key === 'old_emails') obj[key].forEach((eVal, eKey) => {if ('email_pwpush_url' in eVal) obj[key][eKey]['email_pwpush_url'] = eVal['email_pwpush_url'].replace('_-_', '.')});
    else if (key === 'social_media') obj[key].forEach((netVal, netKey) => {
      if ((netKey === 'twitter') && netVal.optimize) if (('optimize_info' in netVal) && 'pwpush_url' in netVal['optimize_info']) obj[key][netkey]['optimize_info']['pwpush_url'] = netVal['optimize_info']['pwpush_url'].replace('_-_', '.');
      else if (netKey === 'other') netVal.forEach((oNetVal, oNetKey) => {if ('url' in oNetVal) obj[key][netKey][oNetKey]['url'] = oNetVal['url'].replace('_-_', '.')});
      else if (netKey in ['discord', 'facebook', 'linkedin', 'medium', 'meetup', 'messenger', 'pinterest', 'reddit', 'slack', 'twitch', 'whatsapp', 'youtube']) if ('url' in netVal) obj[key][netVal]['url'] = netVal['url'].replace('_-_', '.');
    });
    else if (key === 'branding') obj[key].forEach((bVal, bKey) => obj[key][bKey] = bVal.replace('_-_', '.'));
    else if (key in ['google_analytics', 'google_search_console', 'mailchimp', 'paypal']) if ('pwpush_url' in obj[key]) obj[key]['pwpush_url'] = obj[key]['pwpush_url'].replace('_-_', '.');
  });
  return obj;
};

// this method fetches all available data in our database
router.get("/getData", checkJwt, (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/instance/:owner", checkJwt, (req, res) => {
    //const { owner } = req.body;
    const owner = req.params.owner;
    Data.find({ 'owner': owner }, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      // Fix before uncommenting
      //data.data[0] = desanitizeURLs(data.data[0]);
      return res.json({ success: true, data: data });
    });
  });

router.post("/updateInstance/:owner", checkJwt, (req, res) => {
    const owner = req.params.owner;
    const update = req.body.data;
  Data.findOneAndUpdate(
        { 'owner': owner },
        update,
        {new: true,
        runValidators: true},
        (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.delete("/deleteInstance", checkJwt, (req, res) => {
  const { owner } = req.body;
  Data.findOneAndDelete(owner, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/addInstance", checkJwt, (req, res) => {
  let data = new Data();

  //const { owner, title, description } = req.body;
  const { owner } = req.body;

  /*if ((!owner && owner !== 0) || !title || !description) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }*/
  data.owner = owner;
  /*data.title = title;
  data.description = description;*/
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));