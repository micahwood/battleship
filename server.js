var express  = require('express'),
    exphbs   = require('express3-handlebars'),
    http     = require('http'),
    connect  = require('connect'),
    io       = require('socket.io'),
    fs       = require('fs'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    port     = (process.env.PORT || 8081);

// Global - but shouldn't be 
app = express();

/*
 * Setup Express
 */ 
app.configure(function() {
  app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
  app.set('view engine', 'handlebars');

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

// Version 3.x of Express needs this server param
var server = http.createServer(app);
server.listen(port);





//var users = [];



// // Setup Socket.IO
// var io = io.listen(server);
// io.sockets.on('connection', function(socket){
  
//   console.log('Client Connected');

//   socket.on('joinRoom', function(name) {
// console.log('server: joining room')
// console.log(name)
//     var room = getRoomID(); // or something like this?
//     m
//     socket.name = name; 
//     socket.room = room
//     users[name] = name; 
//     socket.join(room);

//     // redirect to game page. 

//     // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
//     // // echo to room 1 that a person has connected to their room
//     // socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
//     // socket.emit('updaterooms', rooms, 'room1');
//   });

//   socket.on('message', function(data){
//     socket.broadcast.emit('server_message',data);
//     socket.emit('server_message',data);
//   });
  
//   socket.on('disconnect', function(){
//     console.log('Client Disconnected.');
//   });
// });




// // Suppose these rooms could get stored somewhere eventually?
// var rooms = []; 

// function getRoomID() {
//   console.log('getRoomID')


//   return id; 
// };



// Errors - need to test these and also add a case for 404
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

// @TODO Figure out how to use your IP...
console.log('Listening on http://0.0.0.0:' + port );