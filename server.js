// var http = require("http").createServer(handler),
// 	io = require("socket.io").listen(http),
// 	fs = require("fs");

// function handler(request, response) {

// }

// io.sockets.on("connection", function(socket) {
// 	socket.on("hi there", function(data) {
// 		console.log(data);
// 	});
// });

// // Module exports
// exports.io = io; //exporting socket.io server object to have access to io.scokets 

// Prob can delete the above??

var express = require('express'),
	app 	= express(),
	http	= require('http'),
	connect = require('connect'),
	io		= require('socket.io'),
	port	= (process.env.PORT || 8081);

app.set('title', 'Battleship');
// console.log(app)
// Setup Express
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.use(connect.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "shhhhhhhhh!"}));
    app.use(connect.static(__dirname + '/static'));
    app.use(app.router);
});


// Version 3.x of Express needs this server param
var server = http.createServer(app);

// Setup the errors
// server.error(function(err, req, res, next){
//     if(err instanceof NotFound) {
//         res.render('404.jade', { locals: { 
//                   title : '404 - Not Found'
//                  ,description: ''
//                  ,author: ''
//                  ,analyticssiteid: 'XXXXXXX' 
//                 },status: 404 });
//     } 
//     else {
//         res.render('500.jade', { locals: { 
//                   title : 'The Server Encountered an Error'
//                  ,description: ''
//                  ,author: ''
//                  ,analyticssiteid: 'XXXXXXX'
//                  ,error: err 
//                 },status: 500 });
//     }
// });


// Setup Socket.IO
var io = io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('Client Connected');
  socket.on('message', function(data){
    socket.broadcast.emit('server_message',data);
    socket.emit('server_message',data);
  });
  socket.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
});

// Listen...
server.listen(port);


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

app.get('/', function(req, res){ 
  res.render('index.jade', {
    locals: { 
              title : 'Battleship :: Home',
              description: 'This page is about Battleship and how it rocks.'
            }
  });
});

// Errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

console.log('Listening on http://0.0.0.0:' + port );