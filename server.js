var http = require("http").createServer(handler); 
var io = require("socket.io").listen(http);
var fs = require("fs");

function handler(request, response) {

}

io.sockets.on("connection", function(socket) {
	socket.on("hi there", function(data) {
		console.log(data);
	});
});

// Module exports
exports.io = io; //exporting socket.io server object to have access to io.scokets 
