const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./router')



// Database setup
// Set following properties if you want to get rid of deprecation warning from mongoose 5.4.13:
//  DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
 
// Mongo DB connection 
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true});


// App setup - get express set up
const app = express()

// middleware
app.use(morgan('combined'))   // logging framework
app.use(cors())   // allow requests from all domains
app.use(bodyParser.json({ type: '*/*' }))   // parse incoming requests into JSON, no matter what the type of request is

router(app)



// Server setup - getting express to talk to the outside world
const port = process.env.PORT || 3090

const server = http.createServer(app)
server.listen(port)
console.log('Server listening on port ' + port)
