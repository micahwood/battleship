var User = require('../models/User');
var express = require('express')
var router = express.Router()

router.get('/user', function(req, res) {
    var username = req.cookies.username || req.query.username;

    User.findOne({ username: username }, function(err, user) {
        if (err) console.error(err);

        res.json(200, user);
    });
});

module.exports = router
