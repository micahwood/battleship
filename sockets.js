var socketio = require('socket.io');

module.exports.listen = function(app) {
  io = socketio.listen(app);

  // Going to try to use rooms instead of namespaces 
  // since the room names are created dynamically. 
  io.sockets.on('connection', function(socket){
    console.log('Client Connected');

    socket.on('joinGame', function(data) {
      var room = data.gid,
          user = data.username;
      console.log(user + ' is joining room: ' + room);
      socket.room = room;
      socket.user = user;
      socket.join(room);
      // socket.emit('opponentAdded');
      // io.sockets.clients(room);
      console.log(io.sockets.clients())
    });

    socket.on('disconnect', function(){
      console.log('Client Disconnected.');
    });
  });

    //   // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    //   // // echo to room 1 that a person has connected to their room
    //   // socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    //   // socket.emit('updaterooms', rooms, 'room1');
    // });

    // socket.on('message', function(data){
    //   socket.broadcast.emit('server_message',data);
    //   socket.emit('server_message',data);
    // });

  return io;
};