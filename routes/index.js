var fs = require('fs');
// loop through all the sister files and require them. 
module.exports = function(app) {
  fs.readdir('./routes', function(err, files) {
    files.forEach(function(file) {
      require('./'+file)(app);
    });
  });
}