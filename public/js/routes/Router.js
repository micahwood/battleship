define([
  'jquery',
  'underscore',
  'backbone',
  'models/User',
  'models/Session',
  'views/ApplicationView',
  'views/RegisterView', 
  'views/LoginView',
  'views/AccountView'
], function ($, _, Backbone, User, Session, ApplicationView, RegisterView, LoginView, AccountView) {
  
  var Router = Backbone.Router.extend({
    
    routes: {
      '': 'home',
      'register' : 'register',
      'login' : 'login',
      'account/:id': 'showAccount'
    },

    home: function() {
      // console.log('in home route');
      
      if(!this.view) {
        this.view = new ApplicationView({ model: new User() });
        this.view.render();
      } else {
        // view has already been established.
      }     
    },

    register: function () {
      var view = new RegisterView();
      view.render();
    },

    login: function () {
      var view = new LoginView();
      view.render();
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
      // redirect to user page
      console.log('is AUTHED');
      // Battleship.currentUser = new User(session.toJSON()); 
    } else {
      console.log('is not authed');
      var view = new ApplicationView({model: new User() }).render();
    }
    
    Backbone.history.start();
  };

  return {
    init: init
  };
});