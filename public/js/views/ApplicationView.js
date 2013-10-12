define([
  'backbone',
  'handlebars',
  'models/Session',
  'models/Game',
  'views/HeaderView',
  'text!templates/application.handlebars',
  'text!templates/header.handlebars'
], function(Backbone, Handlebars, Session, Game, HeaderView, appTemplate, headerTemplate) {

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

      // First, check whether there are any games open. 
      $.ajax({
        url: '/game',
        data: { status: 'open' },
        success: function(json) {
          console.log('found a game')
          // We found an open game, let's join it!
          if (json.hasOwnProperty('gid')) {
            Backbone.history.navigate('game/' + json.gid, {trigger: true});
            // self.addUserToGame(json.gid, $('.username').text());
          }
        },
        error: function(jqxhr, text, status) {

          switch (status) {
            // Invalid request
            case 'Bad Request':
              //
              break;
            // No open game found, we need to create one. 
            case 'Not Found':
              // console.log(self.model.attributes.username)

              var game = new Game({ username: self.model.attributes.username });
              var res = game.save();

              if (!res) {
                // error!
                $('.actions').html('There was an issue joining a game');
              } else if (typeof res.responseText === 'object') {
                var data = JSON.parse(res.responseText);
                game.set('id', data.gid);
                var view = new GameView(game);
                view.render();
                window.location.replace('/#game/' + data.gid);
              }
              break;
            default:
              // Other errors
              break;
          }
        }

      });

      e.preventDefault();
    }
  });

  return ApplicationView;
});