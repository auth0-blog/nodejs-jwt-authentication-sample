var express = require('express'),
    jwt     = require('express-jwt'),
    request = require('request'),
     _      = require('lodash'),
    config  = require('./config'),
    quoter  = require('./quoter');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

var kubernetes = {
  url: process.env.KUBERNETES_API_URL,
  token: process.env.KUBERNETES_API_TOKEN
};

var defaults = {
  url: kubernetes.url,
  rejectUnauthorized: false,
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + kubernetes.token
  }
};

var actionHandler = function(req, res, next) {
  if (!['POST', 'PUT', 'DELETE'].indexOf(req.method)) {
    return next();
  }

  var path = req.path.replace('k8s', '');
  var options = _.cloneDeep(defaults);
  options.url = kubernetes.url + path;
  options.method = req.method;

  // TODO: add params sending
  function callback(error, response, body) {
    res.status(response.statusCode).send(body);
  }

  request(options, callback);
};

app.use('/k8s', jwtCheck);

app.get('/k8s/*', function(req, res) {
  var path = req.path.replace('k8s', '');
  var options = _.cloneDeep(defaults);
  options.url = kubernetes.url + path;

  function callback(error, response, body) {
    /* formatted JSON */
    // var info = JSON.parse(body);
    // res.setHeader('Content-Type', 'application/json');
    // res.status(response.statusCode).send(JSON.stringify(info, 0, 4));
    res.status(response.statusCode).send(body);
  }

  request(options, callback);
});

app.post('/k8s/*', actionHandler);
app.put('/k8s/*', actionHandler);
app.delete('/k8s/*', actionHandler);
