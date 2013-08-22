// How do we protect these pages?
app.get('/game', function(req, res){
  var locals = {
    title : 'Battleship :: Game',
    description: 'This page has a real Battleship game.'
  };

  res.render('game.jade', locals);
});