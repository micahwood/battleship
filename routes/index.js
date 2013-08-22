var fs = require('fs');
// loop through all the sister files and require them. 
fs.readdir('./routes', function(err, files) {
  files.forEach(function(file) {
    require('./'+file);
  });
});