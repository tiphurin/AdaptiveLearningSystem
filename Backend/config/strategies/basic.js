const BasicStrategy = require('passport-http').BasicStrategy
const ServiceProvider = require('../../models').ServiceProvider

module.exports = new BasicStrategy(async (username, password, done) => {
  const serviceProvider = await ServiceProvider.findOne(
    {
      where: {
        username
      }
    }
  )
  if (serviceProvider === null) {
    return done(null, false)
  }
  if (!serviceProvider.validPassword(password)) {
    return done(null, false)
  }
  return done(null, serviceProvider)
})
