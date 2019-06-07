const passport = require('passport')

const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')



// Prevent unauthenicated users from accessing a route
const requireAuth = passport.authenticate('jwt', { session: false })   // session false stops it from doing cookie-based sessions

// Make sure there are valid creds as part of the POST to the login route... we can do this via middleware instead of waiting for the controller to handle it.
const requireSignin = passport.authenticate('local', { session: false });



module.exports = function(app) {
    app.get('/', requireAuth, function(req, res, next) {
        res.send('Hi there')
    })
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup)
}
