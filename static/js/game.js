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
			"spaces": 5,
			"cell_nums": []
		},

		battleship: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 4,
			"cell_nums": []
		},

		sub: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 3,
			"cell_nums": []
		},

		destroyer: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 3,
			"cell_nums": []
		},

		patrol: {
			"x": 0,
			"y": 0,
			"orientation": "horizontal",
			"spaces": 2,
			"cell_nums": []
		},
	},

	hovered_cell_nums: [],

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
				"cursor": "move",
				"revert": "invalid",
				revertDuration: 200,
				snap: ".droppable",
				snapTolerance: 10
				//"helper": helperFunction,
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
						over: self.handleOver,
						// out: self.handleOut,
						hoverClass: "hovered",
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
			
			
			moving_left, moving_right,
			game = BATTLESHIP.game, // TODO figure out how to ref BATTLESHIP down this deep
			cell = $(".cell[data-cell='" + game.current_hovered_cell_nums[0] + "']");

			//if horiz do this, vert will be different
		$(draggable).css({top:-3,left:-1}).appendTo(cell);	

		// save cell num array to the ship.cell_nums
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

				if(ship.x == 0 || ship.x > left) {
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


		if(orientation == "horizontal") {
			// odd space pieces
			if(spaces % 2 != 0) {
				var range = (spaces - 1) / 2;
				var first_num = cell_num - range;

				for(i = 0; i < spaces; i++) {
					var num = first_num + i;
					game.hovered_cell_nums.push(cell_letter + num);
				}
			}
			else { //even
				game.hovered_cell_nums.push(cell_letter + cell_num);
				// math time
			// 	if(moving_left) {
			// 		left = draggable.offset().left - board.offset().left - CELL_WIDTH;
			// 		top = draggable.offset().top - board.offset().top - CELL_HEIGHT;	

			// 		var first_num = Math.round(left/CELL_WIDTH);
			// 	}
			// 	else {
			// 		right = draggable.offset().right - board.offset().right - CELL_WIDTH;

			// 		var first_num = Math.round(right/CELL_WIDTH);
			// 	}
				
			// 	for(i = 0; i < spaces; i++) {
			// 		var num = first_num + i;
			// 		game.hovered_cell_nums.push(cell_letter + num);
			// 	}
			}


			// get the nums
			for(var i = 0; i < game.hovered_cell_nums.length; i++) {
			 	var cell = $(".cell[data-cell='" + game.hovered_cell_nums[i] + "']");
				
				if(cell.length > 0) {
					cell.addClass("hovered");
			 	}				
			}


		}
		else { // what about vertical..

		}
		

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
						square.droppable({
							drop: game.handleDrop,
						});

						square.addClass("hovered")
							  .addClass("droppable");
					} 
					else {
						square.removeClass("hovered");
					}
					
				}
			});
		}

		game.current_hovered_cell_nums = game.hovered_cell_nums;
	},

	handleOut: function(event, ui) {
		var	game = BATTLESHIP.game; // TODO figure out how to ref BATTLESHIP down this deep;
// console.log("handleOut")
// console.log(game.current_hovered_cell_nums);

		for(i = 0; i < game.current_hovered_cell_nums.length; i++) {
			var cell = $(".cell[data-cell='" + game.current_hovered_cell_nums[i] + "']");
				
			if(cell.length > 0) {
					cell.removeClass("hovered");
			}				
		}
	}
};