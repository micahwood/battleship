var express = require('express')
var router = express.Router()
var passport = require('passport')
var controller = require('../controllers/login')

router.post('/login', passport.authenticate('local'), controller.login)
router.get('/loggedin', controller.loggedIn)
// router.get('/login', function(req, res) {
//     res.send('hi')
// })

module.exports = router


