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
  gid: String,
  users: [{
    username: String,
    shipPositions: [{
      carrier: { type: Array, default: [] },
      battleship: { type: Array, default: [] },
      sub: { type: Array, default: [] },
      destroyer: { type: Array, default: [] },
      patrol: { type: Array, default: [] }
    }]
  }],
  status: { type: String, default: 'open' }

}, { _id: false });

//need:
//Game.methods.find
module.exports = mongoose.model('Game', Game);