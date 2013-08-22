// Routes for /login

app.get('/login', function(req, res) {
  var locals = {
    title : 'Battleship :: Login',
    description: ""
  };

  res.render('login.jade', locals);
});

app.post('/login', function(req, res) { 

});

