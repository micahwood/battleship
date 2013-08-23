var express = require('express'),
    http    = require('http'),
    connect = require('connect'),
    io      = require('socket.io'),
    fs      = require('fs'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    port    = (process.env.PORT || 8081);

// Global - but shouldn't be 
app = express();


app.set('title', 'Battleship');

/*
 * Setup Express
 */ 
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false });
  app.use(connect.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'MY$UPERSECRETKEY'}));
  app.use(connect.static(__dirname + '/public'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

require('./config');

require('./routes');

// Version 3.x of Express needs this server param
var server = http.createServer(app);
server.listen(port);

var users = [];

// Routes


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




/* Game API stuff */

// this is for saving the game pieces
//NOTE: Will probably want to pass in the game id in the url here
// ie 'game/:id/lock'
app.post("/game/lock", function(req, res) {
  // req.body is the obj:
  // {shipName: cell_nums}
  // so loop through req.body and make sure there's no missing cell nums
  for(var ship in req.body) {
    if(req.body[ship].length == 0) {
      res.send('false');
    }
  }

  // now save them to the socket io session....
  res.send('true');
});


// Errors - need to test these and also add a case for 404
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

// @TODO Figure out how to use your IP...
console.log('Listening on http://0.0.0.0:' + port );