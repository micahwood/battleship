var socketio = require('socket.io');

module.exports.listen = function(app) {
  io = socketio.listen(app);

  
  var users = {};
  //too lazy to loop through users object to get a count
  var count = 0;

  var join = io.of('/join');
  console.log('listening.......');
  join.on('connection', function(socket){
    console.log('Client Connected');

    socket.on('addUser', function(user) {
      count++;
      socket.me = user;
      console.log(user);

      if (count >= 2) {
        opponent = '';
        for (var player in users) {
          opponent = player;
        }
        socket.emit("gameStart", opponent);
        socket.broadcast.emit("gameStart", socket.me);
      }
      users[user] = user;
    });

    /*
     *  
     */
    // socket.on('joinGame', function(name) {
    //   console.log('server: joining room');
    //   console.log(name);
    //   var room = 'room';//getRoomID(); // or something like this?

    //   socket.name = name;
    //   socket.room = room;
    //   // users[name] = name;
    //   socket.join(room);

    //   // redirect to game page. 

    //   // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    //   // // echo to room 1 that a person has connected to their room
    //   // socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    //   // socket.emit('updaterooms', rooms, 'room1');
    // });

    // socket.on('message', function(data){
    //   socket.broadcast.emit('server_message',data);
    //   socket.emit('server_message',data);
    // });

    socket.on('disconnect', function(){
      console.log('Client Disconnected.');
      delete users[socket.me];
      count--;
    });
  });

  return io;
}