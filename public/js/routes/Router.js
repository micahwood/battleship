define([
  'backbone',
  'models/User',
  'models/Session',
  'models/Game',
  'views/ApplicationView',
  'views/RegisterView',
  'views/LoginView',
  'views/AccountView',
  'views/GameView'
], function (Backbone,
             User,
             Session,
             Game,
             ApplicationView,
             RegisterView,
             LoginView,
             AccountView,
             GameView) {

  var Router = Backbone.Router.extend({

    routes: {
      ''            : 'home',
      'register'    : 'register',
      'login'       : 'login',
      'account/:id' : 'showAccount',
      'game/:gid'   : 'showGame'
    },

    home: function() {
      // console.log('home route')
      // console.log(this.view)
      // @TODO add concept of current view. 
      if (!Battleship.currentView) {
        Battleship.currentView = new ApplicationView({ model: new User() }).render();
      } else {
        Battleship.currentView.undelegateEvents();
      }
    },

    register: function () {
      Battleship.currentView = new RegisterView().render();
    },

    login: function () {
      Battleship.currentView = new LoginView().render();
    },

    showGame: function(gid) {
      var game = new Game({ id: gid });
      game.fetch().then(function() {
        Battleship.currentView = new GameView({ model: game }).render();
      });
    }
  });

  var init = function() {
    window.Battleship = {};

    var router = new Router(),
        session = Battleship.session = new Session();

    if (session.isAuthenticated()) {
      var promise = new User().fetch();
      promise.then(function(user) {
        Battleship.currentUser = new User(user);
        Battleship.currentUser.set('loggedIn', true);
        Backbone.history.start();
      });
    } else {
      Battleship.currentUser = new User();
      Backbone.history.start();
    }
  };

  return {
    init: init
  };
});