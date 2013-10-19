define([
  'backbone',
  'handlebars',
  'models/User',
  'models/Session',
  'views/ApplicationView',
  'text!templates/register.handlebars'
], function(Backbone, Handlebars, User, Session, ApplicationView, registerTemplate){

  var RegisterView = Backbone.View.extend({
    el: '.container',
    form: '#registration-form',

    initialize: function () {},

    render: function () {
      var template = Handlebars.compile(registerTemplate);
      this.$el.html(template);

      return this; 
    },

    events: {
      //'click #registration-button': 'validate',
      'keyup input': 'validate',
      'blur #username': 'checkUniqueUsername', // Make sure username/email are uninque
      'blur #email': 'checkUniqueEmail', // Make sure username/email are uninque
      'submit': 'submit'
    },

    // @TODO implement client side validation. 
    validate: function(e) {
      // console.log('validating reg');
    },

    submit: function(e) {
      var form = $(this.form),
          session = Battleship.session;

      $('.error').text();

      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        data: form.serialize(),
        dataType: 'json',

        success: function(data) {
          console.log('successful reg');
          console.log(data);

          // Create a new user. 
          session.destroy();
          session.save({
            username: data.username,
            email: data.email,
            sid: data._id
          });

          var view = new ApplicationView({ model: new User(data) });
          view.render();
          window.location.replace('#');
        },

        error: function(xhr) {
          if (xhr.responseText) {
            $('.error').text(xhr.responseText);
          }
        }
      });

      e.preventDefault();
    }

  });

  return RegisterView;
});