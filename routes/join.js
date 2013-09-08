var account = require('./account');
    // io      = require('../sockets').listen(server);


/*
 * 
 */
app.post('/join', account.auth, function(req, res) {
  // Sanitize?  
  var user = req.body.user;
  console.log('join route');
  // var locals = {
  //   title : 'Battleship :: Join',
  //   description : 'Looking for other players to join the game',
  //   user : user
  // };
  // 


  // res.render('join', locals);
  // res.json();
});

