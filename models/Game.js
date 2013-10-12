var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


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

//need:
//Game.methods.find ?
module.exports = mongoose.model('Game', Game);