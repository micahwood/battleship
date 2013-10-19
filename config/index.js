require('./auth');

var config = {
  development: {
    mode: 'development',
    host: 'localhost',
    port: 8081,
    db: {
      client: 'mongo',
      connection: 'mongodb://localhost/battleship'
    }
  },

  production: {
    mode: 'production',
    host: '',
    port: 8081,
    db: {
      client: 'mongo',
      connection: 'mongodb://localhost/battleship'
    }
  }
};

module.exports = (function(mode) {
  return config[mode || process.argv[2] || 'development'] || config.development;
})();