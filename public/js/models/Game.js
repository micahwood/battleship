define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Game = Backbone.Model.extend({
    urlRoot: '/game',



    initialize: function() {
      //constructor kinda
      // this.gid = gid;
      // this.users.push(username);
      //// Check if we're still waiting?
      // console.log('create new game with:')
      // console.log(username);
      // console.log(this.users);
    },

    defaults: {
      gid: null,
      users: [],
      locked: false
    },


    // Adds a newuser to the game.  
    addUser: function(username) {
      console.log('adding ' + username);
//       var users = this.get('users');
// console.log('keys');
// console.log(_.keys(users));
//       users.forEach(function(user) {
//         console.log(user);
//       })
      // if (!_.contains(users, username)) {
      //   console.log(users)
      //   console.log(username)
      //   users.push({
      //     username: username,
      //     shipPositions: []
      //   });

      //   this.set('users', users);

      //   if (users.length === 2) {
      //     this.set('locked', true);
      //   }

      //   return this.save();
      // }
    }
  });

  return Game;
});