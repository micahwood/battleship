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
      // Compile the template using Handlebars
      var template = Handlebars.compile(loginTemplate);
      this.$el.html(template);
    },

    events: {
      'submit': 'submit'
    },

    submit: function(e) {
      var form = $(this.form),
          session = Battleship.session;

      session.destroy();
      $('.error').text();

      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        data: form.serialize(),
        dataType: 'json',

        success: function(data) {
          console.log('successful login')
          console.log(data)
          session.save({
            username: data.username,
            sid: data._id,
            email: data.email
          });

          var view = new ApplicationView({ model: new User(data) });
          // view.trigger('change:loggedIn');
          view.render();
          window.location.replace('#');
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