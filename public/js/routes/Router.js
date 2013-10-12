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
      if(!this.view) {
        this.view = new ApplicationView({ model: new User() });
        this.view.render();
      } else {
        this.view.undelegateEvents();
      }
      // console.log(this.view)
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
    // Expose some variables through the Battleship global. 
    var Battleship = window.Battleship = window.Battleship || {},
        router = new Router(),
        session = Battleship.session = new Session();


// console.log('init app....session:')
// console.dir(Battleship.session);
    if (session.isAuthenticated()) {
      // redirect to user page? IDK
      // @TODO allow user to login after refresh. 
      console.log('is AUTHED');
      // Battleship.currentUser = new User(session.toJSON()); 
    } else {
      console.log('is NOT authed');
      var view = new ApplicationView({model: new User() }).render();
    }
    
    Backbone.history.start();
  };

  return {
    init: init
  };
});