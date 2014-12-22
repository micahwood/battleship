define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'models/User',
  'text!templates/header.handlebars'
], function($, _, Backbone, Handlebars, User, headerTemplate){

  var HeaderView = Backbone.View.extend({
    el: 'header',

    defaults: {
      loggedIn: false
    },

    initialize: function() {
      this.loggedIn = this.model.get('loggedIn');
    },

    render: function() {
      var template = Handlebars.compile(headerTemplate);
      var html = template({ loggedIn: this.loggedIn });
      this.$el.html(html);
    },

    events: {
      'click #logout': 'logout'
    },

    logout: function(e) {
      var self = this;

      $.ajax({
        url: 'logout',
        type: 'post',
        success: function(data) {
          Battleship.session.destroy();
          window.location.replace('/');
        }
      });

      e.preventDefault();
    }
  });

  return HeaderView;
});