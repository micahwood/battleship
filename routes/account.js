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

app.get('/account', ensureAuthenticated, function(req, res){
  var user = req.user.username;

  // Will eventually want to modify this query 
  Game.find({'users.username': user}, 'gid', function(err, game) {
    if (err) return err;

    var locals = {
      title : 'Battleship :: Account',
      description: 'This page has your account information for your Battleship user.',
      user: req.user.username,
      game: game
    };

    res.render('account', locals);
  });
});

exports.auth = ensureAuthenticated;
