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
      if (!this.view) {
        this.view = new ApplicationView({ model: new User() });
        this.view.render();
      } else {
        this.view.undelegateEvents();
      }
    },

    register: function () {
      var view = new RegisterView();
      view.render();
    },

    login: function () {
      var view = new LoginView();
      view.render();
    },

    showGame: function(gid) {
      var game = new Game({ id: gid });
      game.fetch().then(function() {
        var view = new GameView({ model: game });
        view.render();
      });
    }
  });

  var init = function() {
    window.Battleship = {};

    var router = new Router(),
        session = Battleship.session = new Session();

    if (session.isAuthenticated()) {
      console.log('is AUTHED');
      var promise = new User().fetch();
      promise.then(function(user) {
        Battleship.currentUser = new User(user);
        Battleship.currentUser.set('loggedIn', true);
        Backbone.history.start();
      });
    } else {
      console.log('is NOT authed');
      Battleship.currentUser = new User();
      Backbone.history.start();
    }
  };

  return {
    init: init
  };
});