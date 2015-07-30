var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
var users = [{
  id: 1,
  username: 'gonto',
  password: 'gonto'
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

app.post('/users', function(req, res) {
  var username;
  var userScheme;
  
  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    userScheme = 'username';
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    userScheme = 'email';
  }

  if (!req.body.username && !req.body.email || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }
  if (_.find(users, {username: username}) || _.find(users, {email: username})) {
   return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, userScheme, 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile)
  });
});

app.post('/sessions/create', function(req, res) {

  var username;
  var userScheme;
  
  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    userScheme = 'username';
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    userScheme = 'email';
  }

  if (!req.body.username && !req.body.email || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, {username: username}) || _.find(users, {email: username});
  if (!user) {
    return res.status(401).send({message:"The username or password don't match", user: user});
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
