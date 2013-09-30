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
  Game.findOne({ status: status }, function(err, game) {
    if (!_.isEmpty(game)) {
      res.json(200, game);
    } else {
      res.json(404, { error: 'No game found with a status of: ' + status });
    }
  });
});


// Creates a new game document with the provided user. 
app.post('/game', account.auth, function(req, res) {
  var id, user;

  if (!req.body.hasOwnProperty('user')) {
    res.json(400, 'You must provide a valid user property');
  }
  user = req.body.user;
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


// This probably should be a put? Used to find the gid and add another user to it.
app.post('/game/:id', account.auth, function(req, res) {
  // Validate!
  var user = req.body.user,
      gid = req.params.id;

  Game.findOne({gid: gid}, function(err, game) {
    if (err) return err;

    if (game.status == 'open') {
      game.users.push({ username: user });
      game.status = 'closed';
      game.save(function(err) {
        if (err) {
          console.error('Error saving game: ' + game + 'ERROR: ' + err);
        } else {
          // socket.join(gid);
          res.json(200, game);
        }
      });
    } else {
      // Someone got here before us. 
    }
  });
});


//
app.get('/game/:id', account.auth, function(req, res){
  // Need to ensure that the user requesting this game is in fact a user of that game.
  var locals = {
    title : 'Battleship :: Game',
    description: 'This page has a real Battleship game.',
    layout: 'game',
    gid: req.params.id,
    user: req.user.username
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