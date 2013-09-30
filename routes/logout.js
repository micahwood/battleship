app.post('/logout', function(req, res){
  req.logout();
  res.json(200);
});