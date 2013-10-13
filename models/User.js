var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt');


var User = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true },
  password: { type: String, required: true },
  games: [{
    gid: String,
    opponent: String
  }]
});


// Validate the document before saving
// Remember! A call to update() doesn't get here, only saves.
User.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

//
//
User.methods.comparePassword = function(newPassword, callback) {
  bcrypt.compare(newPassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

/*
  
 */
User.statics.updateUsersGames = function(username, game, callback) {
  var opponent = '';

  game.users.forEach(function(user) {
    if (user.username !== username) {
      opponent = user.username;
    }
  });
  // If there is an opponent, we need to make sure that this 
  // user is listed as their opponent
  if (opponent !== '') {
    this.update({ username: opponent, 'games.gid': game.gid }, { $set: { 'games.$.opponent': username }}, function(err) {
      if (err) console.error(err);
    });
  }

  this.findOne({ username: username }, function(err, user) {
    if (err) return callback(err);

    user.games.push({ gid: game.gid, opponent: opponent});
    user.save(function(err) {
      return callback(err ? err : null);
    });
  });
};

module.exports = mongoose.model('User', User);