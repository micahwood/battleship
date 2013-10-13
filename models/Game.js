var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    User     = require('./User');

var shipPositons = new Schema({
  carrier: String,
  battleship: String,
  sub: String,
  destroyer: String,
  patrol: String
});

var user = new Schema({
  username: String,
  shipPositions: [shipPositons]
});

var Game = new Schema({
  gid: String,
  users: [user],
  locked: { type: Boolean, default: false }

});

Game.methods.addUser = function(username, callback) {
  var self = this,
      opponent = '';

  console.log('adding ' + username + ' to gid: ' + this.gid);
  this.users.push({ username: username });
  this.save(function(err) {
    if (err) return callback(err);
  
    User.updateUsersGames(username, self, function(err) {
      if (err) return callback(err);
      
      return callback(null, self);
    });
  });
};

// Lock a game if there are 2 players. 
Game.post('save', function(game) {
  if (game.users.length === 2 && this.locked === false) {
    this.locked = true;
    this.save();
  }
});

//need:
//Game.methods.find ?
module.exports = mongoose.model('Game', Game);