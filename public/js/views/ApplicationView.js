define([
  'backbone',
  'handlebars',
  'models/Session',
  'models/Game',
  'views/HeaderView',
  'views/GameView',
  'text!templates/application.handlebars',
  'text!templates/header.handlebars'
], function(Backbone,
            Handlebars,
            Session,
            Game,
            HeaderView,
            GameView,
            appTemplate,
            headerTemplate) {

  // Main view, basically deals with whether the user is authentication. 
  var ApplicationView = Backbone.View.extend({
    el: '.container',
    game: null,

    initialize: function () {
      if (this.model) {
        window.Battleship.currentUser = this.model;
        this.loggedIn = this.model ? this.model.isLoggedIn() : false;
        this.model.on('change', this.render, this);
      }
    },

    render: function () {
      var context = {},
          template, html;

      if (this.model) {
        $.extend(context, this.model.attributes, {loggedIn: this.model.isLoggedIn() });
        this.header = new HeaderView({ model: this.model, el: 'header' });
        this.header.render();
      }

      template = Handlebars.compile(appTemplate);
      html = template(context);
      this.$el.html(html);
    },

    events: {
      'click #login'   : 'showLogin',
      'click #register': 'showRegister',
      'click #joinGame': 'joinGame'
    },

    showLogin: function() {
      Backbone.history.navigate('login', {trigger: true});
    },

    showRegister: function() {
      Backbone.history.navigate('register', {trigger: true});
    },

    joinGame: function(e) {
      console.log('join game');
      var self = this,
          loader = $('<img>').attr('src', '../images/loader.gif');

      $('.actions').html(loader);

      var promise = new Game().fetch({
        data: {
          locked: false
        }
      });

      promise.then(function(game) {
        console.log('.then');
        window.location.replace('/#game/' + game.gid);
      })
      .fail(function(jqxhr, text, status) {
        console.log('faill');
        // switch (status) {
        //   // Invalid request
        //   case 'Bad Request':
        //     //
        //     break;
        //   // No open game found, we need to create one. 
        //   case 'Not Found':
        //     var game = new Game({ username: self.model.get('username') });
        //     game.save().then(function(data) {
        //       window.location.replace('/#game/' + data.gid);
        //       // var view = new GameView({ model: game });
        //       // view.render();
        //     });
        //     break;
        //   default:
        //     // Other errors
        //     break;
        // }
      });

      e.preventDefault();
    }
  });

  return ApplicationView;
});