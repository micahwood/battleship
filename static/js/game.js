var BATTLESHIP = BATTLESHIP || {};


// Sets up the game board canvas and stuff
BATTLESHIP.game = {

	init: function(){
console.log("game initing...");
		// this.drawUserBoard();
		// this.drawOpponentBoard();
		this.bindEvents();
	},

	/* I guess, let's try keeping the coords for these pieces here
	 * We can maybe pass them via ajax or w/e when the user locks em in?
 	 */
	ships: {

		carrier: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 5
		},

		battleship: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 4
		},

		sub: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 3
		},

		destroyer: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 3
		},

		patrol: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 2
		},
	},

	hovered_cell_nums: [],
	// used to draw the lines and stuff?
	drawUserBoard: function(){
		this.drawGrid("user-board");
	},

	drawOpponentBoard: function() {
		this.drawGrid("opponent-board");
	},

	// just using divs instead, whah...
	// drawGrid: function(canvas_id) {
	// 	var canvas = document.getElementById(canvas_id),
	// 		ctx    = canvas.getContext("2d"),
	// 		height = canvas.height,
	// 		width  = canvas.width,
	// 		hRange = height/11, // We need 11 rows/cols
	// 		wRange = width/11,
	// 		letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
	// 		numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	// 		i, x, y;

	// 	ctx.fillStyle = "rgb(17, 150, 162)";
 //    	ctx.font = "36pt Helvetica";
	// 	ctx.beginPath();

	// 	// Draw horizontal lines
	// 	for(i = 0; i <= height; i += hRange) {
	// 		ctx.moveTo(0, i);
	// 		ctx.lineTo(width, i);
	// 	}

	// 	// Draw vertical lines
	// 	for(i = 0; i <= width; i += wRange) {
	// 		ctx.moveTo(i, 0);
	// 		ctx.lineTo(i, height);
	// 	}

	// 	ctx.shadowOffsetX = 2;
	// 	ctx.shadowOffsetY = 2;
	// 	ctx.shadowBlur = 8;

	// 	y = 108;
	// 	// Draw letters
 //    	for(i = 0; i < letters.length; i++) {
 //    		var x = 13;
 //    		// 'I' is thin and needs moved over
 //    		if(letters[i] == "I") {
 //    			x += 10;
 //    		}
 //    		ctx.fillText(letters[i], x, y);
 //    		y += 60
 //    	}

 //    	x = 75;
 //    	// Draw Numbers
 //    	for(i = 0; i < numbers.length; i++) {
 //    		var y = 47;
    		
 //    		// '10' is wider than the others
 //    		if(numbers[i] == 10) {
 //    			x -= 12;
 //    		}
 //    		ctx.fillText(numbers[i], x, y);
 //    		x += 60
 //    	}

	// 	ctx.stroke();
	// },

	// Ran after a user clicks button to save their pieces
	lockPieces: function() {
		//prob call some server side function to save their information 
	},

	// Need to bind events to the board
	bindEvents: function() {
		var carrier	   = $("#carrier"),
			battleship = $("#battleship"),
			sub		   = $("#sub"),
			destroyer  = $("#destroyer"),
			patrol     = $("#patrol"),
			options    = {
				//"containment": "#user-board",
				"cursor": "move",
				"revert": true,
				revertDuration: 200,
				// "snap": 
				//"helper": helperFunction,
				// refreshPositions: true,

			},
			letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
			i,
			self = this;

		for(i = 0; i < letters.length; i++) {
			letter = letters[i];
			$("#" + letter).children().each(function(i){
				var square = $(this);
				// Skip the first cell w/ the label
				if(i != 0) {
					label = letter + i;
					square.attr("data-cell", label);

					// Might as well make these droppable while we're here
					square.droppable({
						//drop: self.handleDrop,
						over: self.handleOver,
						// out: self.handleOut,
						hoverClass: "hovered",
						// tolerance: "touch"
					});
				}
			});
		}
		


		carrier.draggable(options);
		battleship.draggable(options);
		sub.draggable(options);
		destroyer.draggable(options);
		patrol.draggable(options);
	},

	handleDrop: function(event, ui) {
		var draggable = ui.draggable,
			spaces, i, orientation, ok_to_drop = false,
			cell = $(this).attr("data-cell"),
			cell_num = parseInt(cell.substr(1), 10),
			cell_letter = cell.substr(0,1),
			moving_left, moving_right,
			game = BATTLESHIP.game; // TODO figure out how to ref BATTLESHIP down this deep


		moving_left = false;
		moving_right = false;

	},

	handleOver: function(event, ui) {
		var draggable  = ui.draggable,
			target     = event.target,
			board      = $("#user-board"),
			CELL_WIDTH = 60, 
			CELL_HEIGHT = 60, 
			spaces, orientation,
			cell = $(this).attr("data-cell"),
			letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
			cell_num = parseInt(cell.substr(1), 10), left, top,
			cell_letter = cell.substr(0,1),
			moving_left = false, moving_right = false,
			moving_up = false, moving_down = false,
			game = BATTLESHIP.game; // TODO figure out how to ref BATTLESHIP down this deep;
			
			game.hovered_cell_nums = [];

		// This should be the X coord of the piece relative to the board
		left = draggable.offset().left - board.offset().left - CELL_WIDTH;
		top = draggable.offset().top - board.offset().top - CELL_HEIGHT;	
			
		// loop here and figure out which ship we're dragging
		for(var prop in game.ships) {
			var ship = game.ships[prop];

			if(draggable.attr("id") == prop) {
				spaces = ship.spaces;
				orientation = ship.orientation;

				if(ship.x > 0 && ship.x > left) {
					moving_left = true;
				}
				else {
					moving_right = true;
				}

				if(ship.y > 0) {

				}
				// Update the ship's coords
				ship.x = left;
				ship.y = top;
			}
		}	

		console.log('moving left:'+moving_left)

		var diff = left % CELL_WIDTH;
		if(diff < 30) {

		}
		else {
			// it's more than 30, it's not
		}
		
	console.log("top: "+ top +" left: "+left);

		//cell_num = Math.round(left / CELL_WIDTH);

	
		if(orientation == "horizontal") {
			// var hovered_cell = $(".hovered"),
			// 	cell = hovered_cell.attr("data-cell"),
			// 	;


			// odd space pieces
			if(spaces % 2 != 0) {
				var range = (spaces - 1) / 2;
				var first_num = cell_num - range;

				for(i = 0; i < spaces; i++) {
					var num = first_num + i;
					game.hovered_cell_nums.push(cell_letter + num);
				}
			}
			else {
				// math time
			}

			// get the nums
			for(var i = 0; i < game.hovered_cell_nums.length; i++) {
			 	var cell = $(".cell[data-cell='" + game.hovered_cell_nums[i] + "']");
				
				if(cell.length > 0) {
					cell.addClass("hovered");
			 	}				
			}


		}
		// what about vertical..

		// loop through all cells and hi-light those in
		for(i = 0; i < letters.length; i++) {
			letter = letters[i];
			$("#" + letter).children().each(function(i){
				var square = $(this);
				// Skip the first cell w/ the label
				if(i != 0) {
					// if square attribute data cell is in game.hovered_cell_nums
					if($.inArray(square.attr("data-cell"), game.hovered_cell_nums) != -1) {
						// drop is now enabled for only these...
						square.addClass("hovered");
						square.droppable({
							drop: self.handleDrop,
						});
					} 
					else {
						square.removeClass("hovered");
					}
					
				}
			});
		}


		
		game.current_hovered_cell_nums = game.hovered_cell_nums;
		// console.log(cell_letter+cell_num)
		console.log("handle over")
		console.log(game.hovered_cell_nums);
	},

	handleOut: function(event, ui) {
		var	game = BATTLESHIP.game; // TODO figure out how to ref BATTLESHIP down this deep;
console.log("handleOut")
console.log(game.current_hovered_cell_nums);

		for(i = 0; i < game.current_hovered_cell_nums.length; i++) {
			var cell = $(".cell[data-cell='" + game.current_hovered_cell_nums[i] + "']");
				
			if(cell.length > 0) {
					cell.removeClass("hovered");
			}				
		}
	}
};