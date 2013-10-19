var Game = require('../models/Game');

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
var ensureAuthenticated = function(req, res, next) {
  // console.log('ensure authenticated');
  if (!req.isAuthenticated()) {
    res.json(401);
  } else {
    next(); // move to next callback. 
  }
};


module.exports = function(app) {
  return {
    auth: ensureAuthenticated
  };
};