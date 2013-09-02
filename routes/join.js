app.get('/join', function(req, res) {
  var locals = {
    title : 'Battleship :: Join',
    description : 'Looking for other players to join the game'
  };

  res.render('join', locals);
});
