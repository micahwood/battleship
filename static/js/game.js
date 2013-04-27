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
						// hoverClass: "hovered",
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

		for(var prop in game.ships) {
			var ship = game.ships[prop];

			if(draggable.attr("id") == prop) {
				spaces = ship.spaces;
				orientation = ship.orientation;
			}
		}

		if(orientation == "horizontal") {
			$(draggable).css({top:-3,left:-1}).appendTo(cell);	
		}
		else {
			// vert will be different
		}
			
		

		// save cell num array to the ship.cell_nums
	},

	handleOver: function(event, ui) {
		var draggable  = ui.draggable,
			target     = event.target,
			board      = $("#my-board"),
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

				// Update the ship's coords
				ship.x = left;
				ship.y = top;
			}
		}	

		if(orientation == "horizontal") {
			// First, we need to get the first cell number for our array of cell nums. 
			// Start with the pieces w/ an odd number of spaces
			if(spaces % 2 != 0) {
				// The cell that is hovered over will have an equal number of cells
				// hovered over on each side of it. 
				var range = (spaces - 1) / 2;
				var first_num = cell_num - range;
			}
			else { 
				// Pieces w/ an even number of spaces. We need to figure out if the piece
				// is more towards the left of the hovered cell or the right. 
				var range = spaces / 2;
				var diff = (left >= CELL_WIDTH) ? left % CELL_WIDTH : left;
				
				if(diff < 30) {
					// In this case, the piece will have more cells to the left,
					// so subtract range from cell_num
					var first_num = cell_num - range;
				}
				else {
					// In this case, the piece will have more cells to the right,
					// so start with the hovered over cell num minus half the range. 
					var first_num = cell_num - (range / 2);
				} 
			}

			// Fill the array with the proper cells. 
			for(i = 0; i < spaces; i++) {
					var num = first_num + i;
					game.hovered_cell_nums.push(cell_letter + num);
			}

			// For each hovered over cell, add the hovered class to it. 
			for(var i = 0; i < game.hovered_cell_nums.length; i++) {
			 	var cell = $(".cell[data-cell='" + game.hovered_cell_nums[i] + "']");
				
				if(cell.length > 0) {
					cell.addClass("hovered");
			 	}				
			}
		}
		else { // @TODO what about vertical..

		}

		// Loop through all cells and hilight those in the hovered_cells array. 
		// Also, make those cells droppable. 
		for(i = 0; i < letters.length; i++) {
			var letter = letters[i];
			$("#" + letter).children().each(function(i){
				var square = $(this);

				// Skip the first cell w/ the label
				if(i != 0) {
					if($.inArray(square.attr("data-cell"), game.hovered_cell_nums) != -1) {
						// Enable drop for only these cells
						square.droppable({ drop: game.handleDrop})
							  .addClass("hovered")
							  .addClass("droppable");
					} 
					else {
						square.removeClass("hovered");
					}
				}
			});
		}

		// Save state, not yet sure if we'll need to keep this. 
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