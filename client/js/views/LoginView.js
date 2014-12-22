define([
  'backbone',
  'handlebars',
  'models/User',
  'models/Session',
  'views/ApplicationView',
  'views/AccountView',
  'text!templates/login.handlebars'
], function(Backbone, Handlebars, User, Session, ApplicationView, AccountView, loginTemplate) {

  var LoginView = Backbone.View.extend({
    el:   '.container',
    form: '#login-form',

    initialize: function () {},

    render: function () {
      var template = Handlebars.compile(loginTemplate);
      this.$el.html(template);

      return this;
    },

    events: {
      'submit': 'submit'
    },

    submit: function(e) {
      var form = $(this.form);

      Battleship.session.destroy();
      $('.error').text();

      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        data: form.serialize(),
        dataType: 'json',

        success: function(data) {
          Battleship.session.save({
            username: data.username,
            sid: data._id,
            email: data.email
          });
          window.location.replace('/');
        },

        error: function(xhr) {
          var msg;

          if (xhr.status == 401) {
            msg = "Incorrect username or password.";
          }

          $('.error').text(msg);
        }
      });

      e.preventDefault();
    }
  });

  return LoginView;
});