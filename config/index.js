// var fs = require('fs');
// // loop through all the sister files and require them. 
// fs.readdir('./config', function(err, files) {
//   files.forEach(function(file) {
//     require('./'+file);
//   });
// });
require('./db');
require('./auth');