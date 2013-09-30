var express  = require('express'),
    exphbs   = require('express3-handlebars'),
    http     = require('http'),
    connect  = require('connect'),
    socketio = require('./sockets'),
    fs       = require('fs'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    port     = (process.env.PORT || 8081);

// Global - but shouldn't be 
app = express();
var server = http.createServer(app);


/*
 * Setup Express
 */
app.configure(function() {
  app.use(connect.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'MY$UPERSECRETKEY'}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(connect.static(__dirname + '/public'));
  app.use(app.router);
});

require('./config');
require('./routes');

// Errors - need to test these and also add a case for 404
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

socketio.listen(server);
server.listen(port);

console.log('Listening on port ' + port );
