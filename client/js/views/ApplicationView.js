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

    defaults: {
      loggedIn: false
    },

    initialize: function () {
      console.log('init app view');
      this.model = Battleship.currentUser;
      this.loggedIn = this.model.loggedIn;
      this.model.on('change', this.render, this);
    },

    render: function () {
      var context = {},
          template, html;

      $.extend(context, this.model.attributes);
      this.header = new HeaderView({ model: this.model });
      this.header.render();

      template = Handlebars.compile(appTemplate);
      html = template(context);
      this.$el.html(html);

      return this;
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
      var self = this,
          loader = $('<img>').attr('src', '../images/loader.gif');

      $('.actions').html(loader);

      // Search for a game that is not locked. Will create a new game if an available game is not found.
      var promise = new Game().fetch({ data: { locked: false } });

      promise.then(function(game) {
        window.location.replace('/#game/' + game.gid);
      }).fail(function(jqxhr, text, status) {
        console.log('faill');
      });

      e.preventDefault();
    }
  });

  return ApplicationView;
});
