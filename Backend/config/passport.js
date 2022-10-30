const passport = require('passport')
const local = require('./strategies/local')
const bearer = require('./strategies/bearer')
const basic = require('./strategies/basic')

passport.use(local)
passport.use(bearer)
passport.use(basic)

module.exports = passport
