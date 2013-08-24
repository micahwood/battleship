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
        if (err) throw err;

        if (isMatch) return done(null, user);
      });
    });
  }
));


// THIS COULD BE CHANGED TO A DIFFERENT SESSION DATA STORE, LIKE MONGO. 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});