app.get('/', function(req, res){
  var locals = {
    title : 'Battleship :: Home',
    description: 'This page is about Battleship and how it rocks.'
  };

  res.render('index', locals);
});
