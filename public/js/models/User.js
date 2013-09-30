define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var User = Backbone.Model.extend({

    idAttribute: '_id', // Match this up with our sid. 

    defaults: {
      username: '',
      email: '',
      sid: null,
      games: []
    },

    initialize: function(data) {
      if (typeof data != 'undefined') {
        this.sid = data._id; // Redundant. May be able to get rid of this. 
        this.username = data.user;
        this.email = data.email;
      }
    },

    isLoggedIn: function() {
      return !this.isNew();
    }

  });

  return User;
});