var express = require('express')
var router = express.Router()

router.post('/logout', function(req, res){
    req.logout()
    res.json(200)
});

module.exports = router
