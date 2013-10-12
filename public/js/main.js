// Configure Require
require.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'libs/jquery-1.9.1.min',
    'jquery-ui': 'libs/jquery-ui-1.10.2.custom',
    'jquery-ui-collision': 'libs/jquery-collision.min',
    'jquery-draggable-collision': 'libs/jquery-ui-draggable-collision',
    'jquery.cookie': 'libs/jquery.cookie',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone',
    'handlebars': 'libs/handlebars',
    'socketio': '../socket.io/socket.io.js',
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
    'jquery': {
      exports: '$'
    },
    'jquery-ui': {
      deps: ['jquery'],
      exports: 'ui'
    },
    'jquery-ui-collision': {
      deps: ['jquery-ui']
    },
    'jquery-draggable-collision': {
      deps: ['jquery-ui-collision']
    },
    'socketio': {
      exports: 'io'
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