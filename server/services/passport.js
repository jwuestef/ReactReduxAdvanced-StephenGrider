const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const User = require('../models/user')
const config = require('../config')




// Create local strategy to authenticate a user using an email and password
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify this username and password
    // call done with the user if it is the correct username and password
    // Otherwise call done with false
    User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err, false); }
        if (!user) { return done(null, false) }

        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err) }
            if (!isMatch) { return done(null, false) }

            return done(null, user)
        })

    })
})





// set up options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),   // tell our strategy to look at the request header, specifically the header named authorization, and find the token here
    secretOrKey: config.secret
  };

// Create JWT Strategy... payload is decoded token.
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exists in the database
    // If it does, call 'done' with that user
    // Otherwise, call 'done' without a user object
    User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false) }
    
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      });

})



// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)


