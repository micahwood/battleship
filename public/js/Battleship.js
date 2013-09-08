// Let's try one global Battleship object that
// will hold all of our scripts?


var BATTLESHIP = {
	init: function() {
		this.bindEvents();
	}
};


var socket;

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
	console.log('logging in');
	$('#login-form').submit();
};

BATTLESHIP.joinGame = function(e) {
	var self = this,
			//socket = io.connect('http://localhost:8081/join'),
			loader = $('<img>').attr('src', '../images/loader.gif');

	// First, check whether there are any games open. 
	$.ajax({
		url: '/game',
		data: { status: 'open' },
		success: function(json) {
			// We found an open game, let's join it!
			console.log('success');
			console.log(json);

			self.sendToGame(json.gid);

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

	// socket.on('connect', function() {
	// 	console.log('client connecting');
	// 	socket.emit('addUser', $('.username').text());
	// });

	// socket.on('gameStart', function(opponent) {
	// 	$('.actions').text('Good news! We found you an opponent. You will be playing against ' + opponent);

	// 	//socket.emit('joinGame');
	// });

	e.preventDefault();
};


BATTLESHIP.sendToGame = function(gid) {
	window.location = 'game/' + gid;
};


// Sends AJAX request to create a new game. 
BATTLESHIP.createGame = function(user) {
	var self = this; 

	$.ajax({
		url: '/game',
		type: 'post',
		data: { user: user },
		success: function(json) {
			self.sendToGame(json.gid);
		},
		error: function(data) {
			console.log('errored creating gane');
			console.log(data);
		}
	});
};


// Adds another user to an existing game. 
BATTLESHIP.addUserToGame = function(gid, user) {
	var self = this; 

	$.ajax({
		url: '/game/' + gid,
		type: 'put',
		data: { user: user },
		success: function(json) {
			//self.sendToGame(json.gid);
		},
		error: function(data) {
			console.log('errored adding user to game. ');
			//console.log(data);
		}
	});
};

