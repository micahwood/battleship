// define([
//   'jquery',
//   'underscore',
//   'backbone',
//   'handlebars',
//   'models/User',
//   'text!templates/account.handlebars' 
// ], function($, _, Backbone, Handlebars, User, accountTemplate){

//   var AccountView = Backbone.View.extend({
//     el: '.container',

//     render: function() {
//       var context = this.model.attributes;
//       console.log(context)
//       // Compile the template using Handlebars
//       var template = Handlebars.compile(accountTemplate);
//       var html = template(context);
//       this.$el.html(html);
//     },

//     events: {
//       'click .logout': 'logout'
//     },

//     logout: function() {
//       $.ajax({
//         url: 'logout',
//         type: 'post',
//         success: function(data) {
//           Backbone.history.navigate('/', { trigger: true });
//         }
//       })
//     }

    
//   });

//   return AccountView;
// });