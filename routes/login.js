var mongoose = require('mongoose'),
    passport = require('passport');


app.get('/login', function(req, res) {
  var locals = {
    title : 'Battleship :: Login',
    description: ""
  };

  res.render('login', locals);
});


app.post('/login', passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    // failureFlash: true
  })
);


