// Adds another user to an existing game. 
BATTLESHIP.addUserToGame = function(gid, username) {
	var self = this,
			socket;

	$.ajax({
		url: '/game/' + gid,
		type: 'post',
		data: { user: username },
		success: function(json) {
			// connect this guy to the socket and send them to the game. 
			// 
			// self.joinSocketRoom({ room: json.gid, username: username });
			self.sendToGame(json.gid);
		},
		error: function(data) {
			console.error('errored adding user to game. ');
		}
	});
};


BATTLESHIP.joinSocketRoom = function(data) {
	
};

