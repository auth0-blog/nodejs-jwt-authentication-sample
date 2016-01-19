var express   = require('express'),
    jwt       = require('express-jwt'),
    httpProxy = require('http-proxy'),
    fs        = require('fs'),
    apiProxy  = httpProxy.createProxyServer(),
    config    = require('./config'),
    quoter    = require('./quoter');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

var kubernetes = {
  url: process.env.KUBERNETES_API_URL,
  token: ''
};

fs.readFile(process.env.KUBERNETES_API_TOKEN_FILE, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  kubernetes.token = data.replace(/\r?\n|\r/g, '');
});

apiProxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Authorization', 'Bearer ' + kubernetes.token);
});

apiProxy.on('error', function(err, preq, pres) {
  pres.writeHead(500, { 'Content-Type': 'text/plain' });
  pres.write('An error occured at server. Please contact your administrator.');
  pres.end();
});

app.use('/api', jwtCheck);

app.all('/api/*', function(req, res, next) {
  console.log('redirecting to kubernetes API: [' + req.method + '] '+ req.path);

  var options = {
    target: kubernetes.url,
    secure: false
  }

  apiProxy.web(req, res, options);
});
