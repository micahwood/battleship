var express  = require('express'),
    app = express(),
    exphbs   = require('express3-handlebars'),
    server     = require('http').createServer(app),
    connect  = require('connect'),
    config = require('./config');
    socketio = require('./sockets'),
    fs       = require('fs'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    port     = (process.env.PORT || 8081);

mongoose.connect(config.db.connection);

require('./routes')(app);
/*
 * Setup Express
 */
app.configure(function() {
  app.use(connect.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'MY$UPERSECRETKEY' }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(connect.static(__dirname + '/public'));
  app.use(app.router);
});


// Errors - need to test these and also add a case for 404
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

socketio.listen(server);
server.listen(port);

console.log('Listening on port ' + port );
