var express = require('express')
var router = express.Router()
var account = require('../lib/auth')
var Game = require('../models/Game')
var User = require('../models/User')
var _ = require('underscore')

router.get('/game', account.auth, function(req, res) {
  var params = req.query,
      locked = !params.locked,
      username = req.user.username,
      opponent = '',
      gid, msg;

  if (!params.hasOwnProperty('locked')) {
    res.json(400, { error: 'You must pass in a locked property' });
  }

  if (locked !== false && locked !== true) {
    res.json(400, { error: 'Invalid locked property. Please pass in true or false' });
  }

  Game.findOne({ locked: locked }, function(err, game) {
    if (!_.isEmpty(game)) {
      // Found a game, add user to it.
      game.addUser(username, function(err, game) {
        if (err) console.error(err); // Write a generic error handler!
        res.json(200, game);
      })
    } else {
      // No game found. Create a new game.
      newGame = new Game({ gid: createId() });
      newGame.addUser(username, function(err, game) {
        if (err) console.error(err); // Write a generic error handler!
        res.json(201, game);
      });
    }
  });
});

// Gets a game with the passed in gid.
router.get('/game/:gid', account.auth, function(req, res) {
  var gid = req.params.gid;
  Game.findOne({ gid: gid }, function(err, game) {
    if (err) {
      console.error(err);
      return err;
    }

    res.json(200, game);
  });
});

// Updates a game with the passed in gid.
router.put('/game/:gid', account.auth, function(req, res) {
  var gid = req.body.gid,
      users = req.body.users,
      locked = req.body.locked;
console.log('PUT');

  Game.findOne({ gid: gid }, function(err, game) {
    if (err) {
      console.error(err);
      return err;
    }

    game.users = users;
    game.locked = locked;

    game.save(function(err) {
      if (err) return err; // FIX

      res.json(200, game);
    });
  });
});

// Creates a new game document with the provided user.
router.post('/game', account.auth, function(req, res) {
  var gid, username;

  if (!req.body.hasOwnProperty('username')) {
    res.json(400, 'You must provide a valid username property');
  }
  username = req.body.username;
  gid = createId();

  var game = new Game({ gid: gid });
  game.users.push({ username: username });

  game.save(function(err) {
    if (err) {
      console.error(err);
      return err; //??
    }

    res.json(201, {gid: gid});
  });
});


// This probably should be a put? Used to find the gid and add another user to it.
router.post('/game/:id', account.auth, function(req, res) {
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
router.get('/game/:id', account.auth, function(req, res){
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
router.post("/game/:id/lock", function(req, res) {
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

module.exports = router
