var express = require('express')
var app = express()
var config = require('./config')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var socketio = require('./sockets')
var fs = require('fs')
var mongoose = require('mongoose')
var passport = require('passport')
var port = (process.env.PORT || 8081)
var server = app.listen(port)

mongoose.connect(config.db.connection)

// Dynamically setup routes.
fs.readdir('./routes', function(err, files) {
    files.forEach(function(file) {
        app.use('/', require('./routes/' + file))
    })
})

/*
 * Setup Express
 */
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({ secret: 'MY$UPERSECRETKEY', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/client'))

// Errors - need to test these and also add a case for 404
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.send(500, 'Something broke!')
});

socketio.listen(server)
server.listen(port)

console.log('Listening on port ' + port )
