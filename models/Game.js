var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


// Could eventually use sub-documents, but I'm not sure if there is a benefit at this time.
// var shipPositons = new Schema({
//   carrier: Array,
//   battleship: Array,
//   sub: Array,
//   destroyer: Array,
//   patrol: Array
// });

// var participant = new Schema({
//   username: {type: String},
//   shipPositions: [shipPositons]
// });

var Game = new Schema({
  user1: [{
    username: String,
    shipPositions: [{
      carrier: Array,
      battleship: Array,
      sub: Array,
      destroyer: Array,
      patrol: Array
    }]
  }],

  user2: [{
    username: String,
    shipPositions: [{
      carrier: Array,
      battleship: Array,
      sub: Array,
      destroyer: Array,
      patrol: Array
    }]
  }]
});

//need:
//Game.methods.find
module.exports = mongoose.model('Game', Game);