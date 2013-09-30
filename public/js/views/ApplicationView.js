define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'models/Session',
  'models/Game',
  'views/HeaderView',
  'text!templates/application.handlebars',
  'text!templates/header.handlebars' 
], function($, _, Backbone, Handlebars, Session, Game, HeaderView, appTemplate, headerTemplate) {

  // Main view, basically deals with whether the user is authentication. 
  var ApplicationView = Backbone.View.extend({
    el: '.container',

    initialize: function () {
      console.log('init app view')
      console.log(this.model)
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
      'click #login':    'showLogin',
      'click #register': 'showRegister',
      'click #joinGame': 'joinGame'
    },

    showLogin: function() {
      Backbone.history.navigate('login', {trigger: true});
    },

    showRegister: function() {
      Backbone.history.navigate('register', {trigger: true});
    },

    joinGame: function() {
      console.log('join game')
    }
  });

  return ApplicationView;
});