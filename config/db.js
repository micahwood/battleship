var mongoose = require('mongoose'),
    fs       = require('fs');

// loop through models and register them with mongoose. 
fs.readdir('./models', function(err, files) {
  files.forEach(function(file) {
    var name = file.replace('.js', '');

    schema = require('../models/' + file);
    mongoose.model(name, schema);
  });
});

mongoose.connect('mongodb://localhost/battleship');