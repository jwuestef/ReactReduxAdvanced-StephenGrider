const jwt = require('jwt-simple')

const config = require('../config')
const User = require('../models/user')


function tokenForUser(user) {
    // Bad idea to use email, since their email could change mid-exchange... use userId instead
    // convention - use 'sub' as short for 'subject'
    // convention - iat... initialed at time... when we create it
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}



exports.signup = function(req, res, next) {
    
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' })
    }
    
    // See if a user with the given email address exists
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err) }

        // If a user with email exists, return an error
        if (existingUser) { return res.status(422).send({ error: 'Email is already in use' }) }
    
        // If a user with an email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        })
        user.save(function(err) {
            if (err) { return next(err) }

            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) })
        })

    })

}



exports.signin = function(req, res, next) {
    // User has already had their password checked via middleware
    // Just need to give them a token
    res.send({ token: tokenForUser(req.user) })
}


