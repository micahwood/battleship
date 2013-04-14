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

	// Login button
	$("#login").on("click", function(e){
		$("#login-form").show()
		e.preventDefault();
	})
};


