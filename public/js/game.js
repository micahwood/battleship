var BATTLESHIP = BATTLESHIP || {};

BATTLESHIP.game = {

	/**
	 * init: Sets up the JS stuff needed for the game page
	 * @param  {[Game object]} game An instance of a game object. 
	 */
	init: function(game){
		this.game = game;
		this.gid = game.getGid();
		this.user = game.getUser();
		this.initSockets();
		this.bindEvents();
	},




	initSockets: function() {
		var self = this,
				socket = io.connect('http://localhost:8081');

		socket.on('connect', function() {
			console.log('client connecting');
			socket.emit('joinGame', {
				gid: self.gid,
				username: self.user
			});
		});

		socket.on('gameStart', function(opponent) {
			$('.actions').text('Good news! We found you an opponent. You will be playing against ' + opponent);

		});
	},
};