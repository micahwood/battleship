var account = require('./account')

app.get('/join', account.auth, function(req, res) {
  var locals = {
    title : 'Battleship :: Join',
    description : 'Looking for other players to join the game',
    user : req.user.username
  };

  res.render('join', locals);
});

