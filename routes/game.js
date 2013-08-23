// How do we protect these pages?
app.get('/game', function(req, res){
  var locals = {
    title : 'Battleship :: Game',
    description: 'This page has a real Battleship game.'
  };

  res.render('game.jade', locals);
});



// this is for saving the game pieces
//NOTE: Will probably want to pass in the game id in the url here
// ie 'game/:id/lock'
app.post("/game/:id/lock", function(req, res) {
  // req.body is the obj:
  // {shipName: cell_nums}
  // so loop through req.body and make sure there's no missing cell nums
  for(var ship in req.body) {
    if(req.body[ship].length == 0) {
      res.send('false');
    }
  }

  // now save them to the socket io session....
  res.send('true');
});