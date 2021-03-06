var mongoose = require('mongoose'),
    User = mongoose.model('User');


// Returns true/false
// @TODO Validate more.
// 
// Things this needs to do:
//      - // Make sure email and user is unique
//      - // Make sure all fields are filled out
//      - // Make sure passwords match
//      - Sanitize. 
//      - I'm sure there are more. 
function validateUserRegistration(user, callback) {
  var error = null,
      isValidated = false;

  for (var i in user) {
    if (user[i] === '') {
      error = 'Please fill in all fields.';
    }
  }

  // This could use some flow control. 
  if (!error) {
    User.count({username: user.username}, function(err, count){
      if (count !== 0) {
        callback('That username already exists.', false);
      } else {
        User.count({email: user.email}, function(err, count){
          if (count !== 0) {
            error = 'That email address already exists.';
          } else if (user.password !== user.confirm_password) {
            error = 'Password and confirmation must match.';
          } else {
            isValidated = true;
          }

          callback(error, isValidated);
        });
      }
    });
  }
}

/**
 * 
 */
app.get('/register', function(req, res) {
  var locals = {
    title : 'Battleship :: Register',
    description: ""
  };

  res.render('register', locals);
});

/**
 * 
 */
app.post('/register', function(req, res) {
  var postData = req.body.user;

  validateUserRegistration(postData, function(err, isValidated) {
    if (!isValidated) {
      res.render('register', {error: err});
    } else {
      var user = new User(postData);

      user.save(function(err, user) {
        if (err) throw err;
        // set the session first, then redirect. 
        res.redirect('account', {user: user.username});
      });
    }
  });
});


