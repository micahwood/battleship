var account = require('./account'),
    Game = require('../models/Game'),
    _ = require('underscore');

// Gets a game with the passed in status property. 
app.get('/game', account.auth, function(req, res) {
  var params = req.query,
      status, gid, msg;

  if (!params.hasOwnProperty('status')) {
    res.json(400, { error: 'You must pass in a status property' });
  }

  if (params.status !== 'open' && params.status !== 'closed') {
    res.json(400, { error: 'Invalid status property. Please pass in \'open\' or \'closed\'' });
  }

  status = params.status;
  Game.find({ status: status }, function(err, game) {
    console.log('found: ' + game);
    if (!_.isEmpty(game)) {
      res.json(200, { gid: game.gid });
    } else {
      res.json(404, { error: 'No game found with a status of: ' + status });
    }
  });
});


// Creates a game document with the provided user. 
app.post('/game', account.auth, function(req, res) {
  var params = req.body,
      id, user;

  if (!params.hasOwnProperty('user')) {
    res.json(400, 'You must provide a valid user property');
  }
  user = params.user;
  id = createId();

  var game = new Game({
    gid: id,
    users: [{
      username: user
    }]
  });

  game.save(function(err) {
    if (err) return err; //??
    res.json(201, {gid: id});
  });
});


//
app.get('/game/:id', account.auth, function(req, res){
  // Need to ensure that the user requesting this game is in fact a user of that game.
  var locals = {
    title : 'Battleship :: Game',
    description: 'This page has a real Battleship game.',
    layout: 'game'
  };

  res.render('game', locals);
});



// this is for saving the game pieces
//NOTE: Will probably want to pass in the game id in the url here
// ie 'game/:id/lock'
app.post("/game/:id/lock", function(req, res) {
  // req.body is the obj:
  // {shipName: cell_nums}
  // so loop through req.body and make sure there's no missing cell nums
  for(var ship in req.body) {
    if(req.body[ship].length === 0) {
      res.send('false');
    }
  }

  // now save them to the socket io session....
  res.send('true');
});


// Lifted this from an SO article - think we need something better?
function createId() {
  var text = "",
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}