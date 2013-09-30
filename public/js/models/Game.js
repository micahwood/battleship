define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Game = Backbone.Model.extend({
    initialize: function(gid) {
      //constructor kinda
      //// Check if we're still waiting?
    },

    defaults: {
      gid: '',
      users: [],
      // Are we still waiting for an opponent?
      locked: true
    }
  });

  return Game;
});