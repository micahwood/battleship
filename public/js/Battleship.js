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
	$('#joinGame').on('click', this.joinGame);
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
	var socket = io.connect('http://localhost:8081/join'),
			loader = $('<img>').attr('src', '../images/loader.gif');

	$('.actions').html(loader);

	socket.on('connect', function() {
		console.log('client connecting');
		socket.emit('addUser', $('.username').text());
	});

	socket.on('gameStart', function(opponent) {
		$('.actions').text('Good news! We found you an opponent. You will be playing against ' + opponent);

		//socket.emit('joinGame');
	});

	e.preventDefault();
};



