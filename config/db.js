var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

// Setup Models
var User = new Schema({
  username: String,
  email: String,
  password: String
});

mongoose.model('User', User);
mongoose.connect('mongodb://localhost/battleship');