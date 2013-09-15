// Let's try one global Battleship object that
// will hold all of our scripts?


var BATTLESHIP = {
	init: function() {
		this.bindEvents();
	}
};


BATTLESHIP.bindEvents = function () {
	$('#login-button').on('click', this.login);
	$('#registration-button').on('click', this.register);
	$('#joinGame').on('click', this.joinGame.bind(this));
};

BATTLESHIP.register = function() {
	// validate and return true
	// 
	// console.log('register')
	$('#registration-form').submit();
	// return true;
};

BATTLESHIP.login = function() {
	//
	$('#login-form').submit();
};

/* Game functions below. These should be added to BATTLESIHP.game.method() */

BATTLESHIP.joinGame = function(e) {
	var self = this,
			loader = $('<img>').attr('src', '../images/loader.gif');

	// First, check whether there are any games open. 
	$.ajax({
		url: '/game',
		data: { status: 'open' },
		success: function(json) {
			// We found an open game, let's join it!
			if (json.hasOwnProperty('gid')) {
				self.addUserToGame(json.gid, $('.username').text());
			}
		},
		error: function(jqxhr, text, status) {

			switch (status) {
				// Invalid request
				case 'Bad Request':
					//
					break;
				// No open game found, we need to create one. 
				case 'Not Found':
					self.createGame('bryce');
					break;
				default:
					// Other errors
					break;
			}
		}

	});
	$('.actions').html(loader);

	e.preventDefault();
};


BATTLESHIP.sendToGame = function(gid) {
	window.location = 'game/' + gid;
};


// Sends AJAX request to create a new game. 
BATTLESHIP.createGame = function(username) {
	var self = this;

	$.ajax({
		url: '/game',
		type: 'post',
		data: { user: username },
		success: function(json) {
			// self.joinSocketRoom({ room: json.gid, username: username });
			self.sendToGame(json.gid);
		},
		error: function(data) {
			console.log('errored creating gane');
			console.log(data);
		}
	});
};


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
	var socket = io.connect('http://localhost:8081');
	socket.emit('joinGame', data);
};

