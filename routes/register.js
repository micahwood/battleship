var mongoose = require('mongoose'),
    User = mongoose.model('User');


// Returns true/false
// 
// Things this needs to do:
//      - Make sure email and user is unique
//      - Make sure all fields are filled out
//      - Make sure passwords match
//      - Sanitize. 
//      - I'm sure there are more. 
function validateUserRegistration(userObj) {
  // @TODO Validate more.
  if (userObj.password !== '' || userObj.confirm_password !== '') {
    if (userObj.password === userObj.confirm_password) {
      return true;
    }
  }

  return false;
}

/**
 * 
 */
app.get('/register', function(req, res) {
  var locals = {
    title : 'Battleship :: Register',
    description: ""
  };

  res.render('register.jade', locals);
});

/**
 * 
 */
app.post('/register', function(req, res) {
   var postData = req.body.user;

   for (var i in postData) {
      // something wasn't filled in @TODO this
      if (postData[i] === '') return false;
    }


    if (validateUserRegistration(postData)) {
      console.log('saving user');
      var user = new User(postData);

      user.save(function(err, user) {
        if (err) throw err;

        console.log(res)
      });
    } else {
      // error in here. 
    }

    // 4) redirect to account page v
  }
);


