const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
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
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", checkJwt, (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/instance/:id", checkJwt, (req, res) => {
    //const { id } = req.body;
    const id = req.params.id;
    Data.find({ 'id': id }, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

// this is our update method
// this method overwrites existing data in our database
router.post("/updateInstance/:id", checkJwt, (req, res) => {
    const id = req.params.id;
    const update = req.body.data;
  Data.findOneAndUpdate(
        { 'id': id },
        update,
        {new: true,
        runValidators: true},
        (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteInstance", checkJwt, (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/addInstance", checkJwt, (req, res) => {
  let data = new Data();

  const { id, title, description } = req.body;

  if ((!id && id !== 0) || !title || !description) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.id = id;
  data.title = title;
  data.description = description;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));