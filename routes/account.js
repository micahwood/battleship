app.get('/account', function(req, res){
  var locals = {
    title : 'Battleship :: Account',
    description: 'This page has your account information for your Battleship user.'
  };

  res.render('account.jade', locals);
});