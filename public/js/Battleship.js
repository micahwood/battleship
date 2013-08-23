// Let's try one global Battleship object that
// will hold all of our scripts?


var BATTLESHIP = {
	"init": function() {
		this.bindEvents();
	}
};




BATTLESHIP.bindEvents = function () {
	// Register buton
	// Maybe registering w/ MongoDB backened?
	$("#register").on("click", function(e){
		alert("Coming Soon!");
		e.preventDefault();
	})

	$('#login-button').on('click', this.login);
	$('#registration-button').on('click', this.register);
};

BATTLESHIP.register = function() {
	// validate and return true
	// 
	console.log('register')
	$('#registration-form').submit();
	// return true;
};

BATTLESHIP.login = function() {
	//
	console.log('logging in');
	$('#login-form').submit();
};

BATTLESHIP.joinGame = function() {
console.log('joining room')
	var socket = io.connect();


	// this iwll need to change, to like a UID or something
	var name = $("#username").val();

	// So we connected to the server, 
	socket.on('connect', function() {
	    socket.emit('joinRoom', name);
	})

	// socket.on('message', function(data) {
	//     console.log("incoming: "+ data);
	// })
};



