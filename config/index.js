require('./db');
require('./auth');

var config = {
  local: {
    mode: 'local',
    host: 'localhost',
    port: 8081
  },
  tiltjuice: {
    mode: 'tilejuice',
    host: 'http://tiltjuice.com',
    port: 8081
  },
  production: {
    mode: 'production',
    port: 8081
  },

  mongo: {
    host: 'mongodb://localhost/battleship',
    port: 27017
  }
};

module.exports = function(mode) {
  return config[mode || process.argv[2] || 'local'] || config.local;

  // Could return different mongo configurations here too?
};