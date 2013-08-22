// Routes for /login
// 
var passport = require('passport');

app.get('/login', function(req, res) {
  var locals = {
    title : 'Battleship :: Login',
    description: ""
  };

  res.render('login.jade', locals);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    failureFlash: true
  })
);


