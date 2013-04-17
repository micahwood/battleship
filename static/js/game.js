var BATTLESHIP = BATTLESHIP || {};


// Sets up the game board canvas and stuff
BATTLESHIP.game = {

	init: function(){
		console.log("game initing...");
		this.drawUserBoard();
		this.drawOpponentBoard();
	},

	// used to draw the lines and stuff?
	drawUserBoard: function(){
		this.drawGrid("user-board");
	},

	drawOpponentBoard: function() {
		this.drawGrid("opponent-board");
	},

	drawGrid: function(canvas_id) {
		var canvas = document.getElementById(canvas_id),
			ctx    = canvas.getContext("2d"),
			height = canvas.height,
			width  = canvas.width,
			hRange = height/11, // We need 11 rows/cols
			wRange = width/11,
			letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
			numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			i, x, y;

		//ctx.strokeStyle = "#333";
		//ctx.fillStyle = "#333";
		ctx.fillStyle = "rgb(17, 150, 162)";
    	ctx.font = "36pt Helvetica";
		ctx.beginPath();

		// Draw horizontal lines
		for(i = 0; i <= height; i += hRange) {
			ctx.moveTo(0, i);
			ctx.lineTo(width, i);
		}

		// Draw vertical lines
		for(i = 0; i <= width; i += wRange) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, height);
		}

		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 8;

		y = 108;
		// Draw letters
    	for(i = 0; i < letters.length; i++) {
    		var x = 13;
    		// 'I' is thin and needs moved over
    		if(letters[i] == "I") {
    			x += 10;
    		}
    		ctx.fillText(letters[i], x, y);
    		y += 60
    	}

    	x = 75;
    	// Draw Numbers
    	for(i = 0; i < numbers.length; i++) {
    		var y = 47;
    		
    		// '10' is wider than the others
    		if(numbers[i] == 10) {
    			x -= 12;
    		}
    		ctx.fillText(numbers[i], x, y);
    		x += 60
    	}

		ctx.stroke();
	},

	// Ran after a user clicks button to save their pieces
	lockPieces: function() {

	},

	// Need to bind events to the board
	bindEvents: function() {

	}
};