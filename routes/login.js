var passport = require('passport');

module.exports = function(app) {
  // Just for testing:
  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.json(200, req.user);
  });
};



