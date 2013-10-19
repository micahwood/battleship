var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose      = require('mongoose'),
    User          = require('../models/User');


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: "Incorrect username or password." });

      user.comparePassword(password, function(err, isMatch) {
        if (!user) return done(null, false, { message: "Incorrect username or password." });
        if (isMatch) return done(null, user);
      });
    });
  }
));


passport.serializeUser(function(user, done) {
  console.log('serializing: ');
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('DE - serializing: ');
  console.log(id);
  User.findById(id, function (err, user) {
    done(err, user);
  });
});