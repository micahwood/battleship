
function loggedIn(req, res) {
    console.log('lg')
    res.send(req.isAuthenticated() ? req.user : '0')
}

function login(req, res) {
    res.json(200, req.user)
}

module.exports = {
    loggedIn: loggedIn,
    login: login
}
