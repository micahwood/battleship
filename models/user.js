var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt');


var User = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true },
  password: { type: String, required: true }
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