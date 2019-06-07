const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema



// Define our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
})



// on save hook, encrypt password - before saving ("pre-saving") a model, run this function
userSchema.pre('save', function(next) {
    // user is an instance of this user model
    const user = this

    // Generate a salt, and when finished, run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err) }

        // hashing (or "encrypt") the password using the salt... and then run the callback
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err) }

            // overwrite the password with the hashed version
            user.password = hash
            // Perform the next action (which is to save the user)
            next()
        })
    })
})



// See if hashed password matches candidatePassword
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    // Bycrypt handles the salt and everything behind the scenes
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err) }

        callback(null, isMatch)
    })
}



// Create the model class
const ModelClass = mongoose.model('user', userSchema)



// Export the model
module.exports = ModelClass


