var express = require('express')
var router = express.Router()

router.get('*', function(req, res) {
    res.sendFile('client/templates/index.html', { root: process.cwd() })
})

module.exports = router
