//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const Config = require('./configuration.json');

const env = Config.env;

// define the Express app
const app = express();

// the database
const instances = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${Config.auth0[env].domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: `https://${Config.auth0[env].domain}/api/v2/`,
  issuer: `https://${Config.auth0[env].domain}/`,
  algorithms: ['RS256']
});

// retrieve all instances
// We shouldn't use this in prod for obvious reasons ;)
app.get('/', (req, res) => {
  const is = instances.map(i => ({
    id: i.id,
    title: i.title,
    description: i.description,
    answers: i.answers.length,
    owner: i.owner
  }));
  res.send(is);
});

// get a specific instance
app.get('/:id', checkJwt, (req, res) => {
  if (req.user.sub !== req.params.id) return res.status(403).send();
  //const instance = instances.filter(i => (i.id === parseInt(req.params.id)));
  const instance = instances.filter(i => (i.id === req.params.id));
  if (instance.length > 1) return res.status(500).send();
  if (instance.length === 0) return res.status(404).send();
  res.send(instance[0]);
});
/*app.get('/:id', (req, res) => {
  const instance = instances.filter(i => (i.id === parseInt(req.params.id)));
  if (instance.length > 1) return res.status(500).send();
  if (instance.length === 0) return res.status(404).send();
  res.send(instance[0]);
});*/

// update an instance
app.put('/:id', checkJwt, (req, res) => {
  if (req.user.sub !== req.params.id) return res.status(403).send();
  //const {instance} = req.body;
  var instance = instances.filter(i => (i.id === req.params.id));
  if (instance.length > 1) return res.status(500).send();
  if (instance.length === 0) return res.status(404).send();

  /*instance[0].answers.push({
    answer,
    owner: req.user.name,
  });*/
  //bear.name = req.body.name;
  //instance = _.extend(instance, req.body);

  //instance[0] = req.body;
  for (var prop in req.body.instance) {
    if (!req.body.instance.hasOwnProperty(prop)) continue;
    var obj = req.body.instance[prop];
    //if (!(obj in instance[0])) return res.status(500).send();
    if ((obj in instance[0]) && (instance[0][key] !== obj)) {
      instance[0][key] = obj;
    }
  };
  /*instance.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'Instance updated!' });
  });*/

  res.status(200).send();
});

// insert a new instance
app.post('/', checkJwt, (req, res) => {
  const {title, description, id} = req.body;
  const newInstance = {
    //id: req.user.sub,
    id,
    title,
    description,
    answers: [],
    owner: req.user.name,
  };
  instances.push(newInstance);
  res.status(200).send();
});

// insert a new answer to an instance
app.post('/answer/:id', checkJwt, (req, res) => {
  const {answer} = req.body;

  const instance = instances.filter(i => (i.id === parseInt(req.params.id)));
  if (instance.length > 1) return res.status(500).send();
  if (instance.length === 0) return res.status(404).send();

  instance[0].answers.push({
    answer,
    owner: req.user.name,
  });

  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});