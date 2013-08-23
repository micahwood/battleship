// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next(); // move to next callback. 

  res.redirect('/login');
}



app.get('/account', ensureAuthenticated, function(req, res){
  var locals = {
    title : 'Battleship :: Account',
    description: 'This page has your account information for your Battleship user.',
    user: req.user.username
  };

  res.render('account.jade', locals);
});