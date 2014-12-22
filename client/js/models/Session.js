define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.cookie'
], function($, _, Backbone) {

  var Session = Backbone.Model.extend({
    defaults: {
      sid: null,
      username: null,
      email: null
    },

    initialize: function() {
      return this.load();
    },

    isAuthenticated: function() {
      return Boolean(this.get("sid"));
    },

    save: function(authHash) {
      $.cookie('username', authHash.username, {expires: 5 });
      $.cookie('email', authHash.email, {expires: 5 });
      return $.cookie('sid', authHash.sid, {expires: 5 });
    },

    load: function() {
      return this.set({
        username: $.cookie('username'),
        email: $.cookie('email'),
        sid: $.cookie('sid')
      });
    },

    destroy: function() {
      // this.clear();
      return $.removeCookie('username') && $.removeCookie('sid') && $.removeCookie('email');
    }
  });

  return Session;
});