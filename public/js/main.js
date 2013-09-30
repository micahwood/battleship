// Configure Require
require.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'libs/jquery-1.9.1.min',
    'jquery.cookie': 'libs/jquery.cookie',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone',
    'handlebars': 'libs/handlebars',
    'router': 'routes/Router',

    // Require.js plugins here:
    'text': 'libs/text',

    'templates': '../templates'
  },

  // Shim these guys since they are non-AMD scripts that do not already call define().
  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'jquery.cookie': {
      deps: ['jquery']
    }
  }

});

// Boot up the app:
require(['router'], function(Router) {
  Router.init();
});