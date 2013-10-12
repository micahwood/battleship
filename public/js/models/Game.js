define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Game = Backbone.Model.extend({
    urlRoot: '/game',
    gid: null,
    users: [],
    locked: false,


    initialize: function() {
      //constructor kinda
      // this.gid = gid;
      // this.users.push(username);
      //// Check if we're still waiting?
      console.log('create new game with:')
      // console.log(username);
      console.log(this.users);
      
    },


    // Create a new Game  
    addUser: function(username) {
      // this.users.push(username);

      if (this.users.length === 2) {
        this.locked = true;
      }
    }
  });

  return Game;
});